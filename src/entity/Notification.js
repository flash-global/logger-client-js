import { camelCase, upperFirst } from 'lodash';

class Notification {
    constructor(args = {}) {
        this.level = 2;
        this.flags = 0;
        this.namespace = 2;
        this.env = 'n/c';
        this.context = [];
        this.reportedAt = new Date();

        Object
            .keys(args)
            .map((key) => {
                if (typeof this[`set${upperFirst(camelCase(key))}`] === 'function') {
                    this[`set${upperFirst(camelCase(key))}`](args[key]);
                } else {
                    this[camelCase(key)] = args[key];
                }

                return null;
            });
    }

    getId() {
        return this.id;
    }

    setId(id) {
        this.id = id;
    }

    getReportedAt() {
        return this.reportedAt;
    }

    setReportedAt(reportedAt) {
        this.reportedAt = reportedAt;
    }

    getLevel() {
        return this.level;
    }

    setLevel(level) {
        this.level = level;
    }

    getFlags() {
        return this.flags;
    }

    setFlags(flags) {
        this.flags = flags;
    }

    getNamespace() {
        return this.namespace;
    }

    setNamespace(namespace) {
        this.namespace = namespace;
    }

    getMessage() {
        return this.message;
    }

    setMessage(message) {
        this.message = message;
    }

    getBacktrace() {
        return this.backtrace;
    }

    setBacktrace(backtrace) {
        this.backtrace = backtrace;
    }

    getUser() {
        return this.user;
    }

    setUser(user) {
        this.user = user;
    }

    getServer() {
        return this.server;
    }

    setServer(server) {
        this.server = server;
    }

    getCommand() {
        return this.command;
    }

    setCommand(command) {
        this.command = command;
    }

    getOrigin() {
        return this.origin;
    }

    setOrigin(origin) {
        if (!['http', 'cron', 'cli'].includes(origin)) {
            throw new Error('NotificationEndpoint origin has to be either "http", "cron" or "cli"');
        }
        this.origin = origin;
    }

    getCategory() {
        return this.category;
    }

    setCategory(category) {
        this.category = category;
    }

    getEnv() {
        return this.env;
    }

    setEnv(env) {
        this.env = env;
    }

    getContext() {
        return this.context;
    }

    setContext(context) {
        this.context = context;
    }
}

// managing categories
Notification.SECURITY = 1;
Notification.PERFORMANCE = 2;
Notification.BUSINESS = 4;
Notification.AUDIT = 8;
Notification.SQL = 16;
Notification.TECHNICAL = 32;
Notification.TRACKING = 64;

// managing levels
Notification.LVL_DEBUG = 1;
Notification.LVL_INFO = 2;
Notification.LVL_WARNING = 4;
Notification.LVL_ERROR = 8;
Notification.LVL_PANIC = 16;

export default Notification;
