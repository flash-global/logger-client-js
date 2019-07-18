const { camelCase, snakeCase } = require('lodash');
const moment = require('moment');

class Notification {
    static SECURITY = 1;
    static PERFORMANCE = 2;
    static BUSINESS = 4;
    static AUDIT = 8;
    static SQL = 16;
    static TECHNICAL = 32;
    static TRACKING = 64;

    static LVL_DEBUG = 1;
    static LVL_INFO = 2;
    static LVL_WARNING = 4;
    static LVL_ERROR = 8;
    static LVL_PANIC = 16;

    id;
    reportedAt = new moment();
    level = 2;
    flags = 0;
    namespace = '/';
    message;
    backtrace;
    user;
    server;
    command;
    origin;
    category;
    env = 'n/c';
    context;

    constructor(args = {}) {
        Object.keys(args)
            .filter((key) => camelCase(key) in this)
            .forEach((key) => this[camelCase(key)] = args[key]);

        if (!(this.reportedAt instanceof moment)) {
            this.reportedAt = new moment(this.reportedAt);
        }
    }

    toJson() {
        const objectToReturn = {};

        Object.keys(this).forEach((property) => {
            objectToReturn[snakeCase(property)] = this[property];
        });

        objectToReturn.back_trace = objectToReturn.backtrace;
        delete objectToReturn.backtrace;

        return objectToReturn;
    }
}

module.exports = Notification;
