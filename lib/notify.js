const { configs, hasBeenConfigured } = require('./configure.js');
const Notification = require('./../src/entity/Notification');
const validate = require('./../src/validator/notificationValidator');
const ErrorStackParser = require('error-stack-parser');

const isHttpServer = configs.isHttpServer;

const isNodeProcess = typeof process !== 'undefined';

const buildBacktrace = () => {
    const backtraceList = [];
    const stackFrames = ErrorStackParser.parse(new Error());

    for (let stackFrame of stackFrames) {
        if (stackFrame.fileName.includes('lib/notify.js')) {
            continue;
        }

        const backtrace = { file: stackFrame.fileName + ':' + stackFrame.lineNumber };

        if (stackFrame.functionName) {
            backtrace['function'] = stackFrame.functionName;
        }

        if (stackFrame.args) {
            backtrace['args'] = stackFrame.args;
        }

        backtraceList.push(backtrace);
    }

    return backtraceList;
};

const buildServer = () => {
    if (!isNodeProcess) {
        return (typeof window !== 'undefined' && window.location) ? window.location.hostname: '';
    }

    try {
        const os = require('os');
        return os.hostname();
    } catch (e) {
        return '';
    }
};

const buildCommand = () => {
    if (!isNodeProcess) {
        return '';
    }

    return process.argv.join(' ');
};

const buildEnv = () => {
    if (!isNodeProcess) {
        return 'n/c';
    }

    return process.env.NODE_ENV || 'n/c';
};

module.exports = (notification) => new Promise((resolve, reject) => {
    hasBeenConfigured();

    let parsedNotification = notification;

    if (!(notification instanceof Notification)) {
        parsedNotification = new Notification({
            message: notification,
            level: Notification.LVL_INFO,
            category: Notification.BUSINESS,
        });
    }

    if (parsedNotification.level < configs.filterLevel) {
        return reject("too low level");
    }

    parsedNotification.origin = parsedNotification .origin || (isHttpServer ? 'http': 'cli');
    parsedNotification.backtrace = parsedNotification.backtrace || buildBacktrace();
    parsedNotification.server = parsedNotification.server || buildServer();
    parsedNotification.command = parsedNotification.command || buildCommand();
    parsedNotification.env = parsedNotification.env || buildEnv();

    validate(parsedNotification)
        .then((validationResult) => {
            if (!validationResult.valid) {
                return reject(validationResult.errors);
            }

            return fetch(`${configs.url}/api/notifications`, {
                method: 'POST',
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: `notification=${JSON.stringify(parsedNotification.toJson())}`,
            }).then((response) => {
                if (response.ok === false) {
                    return reject(response);
                }

                response.json().then((data) => resolve(data));
            });
        })
        .catch((error) => reject(error));
});
