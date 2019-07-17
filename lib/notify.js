const { configs, hasBeenConfigured } = require('./configure.js');
const Notification = require('./../src/entity/Notification');
const validate = require('./../src/validator/notificationValidator');

const isHttpServer = () => {
    try {
        require('http');
        return true;
    } catch (e) {
        return false;
    }
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

    parsedNotification = new Notification(parsedNotification.toJson());
    parsedNotification.origin = isHttpServer() ? 'http': 'cli';

    validate(parsedNotification)
        .then((validationResult) => {
            if (!validationResult.valid) {
                return reject(validationResult.errors);
            }

            return fetch(configs.url, {
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
