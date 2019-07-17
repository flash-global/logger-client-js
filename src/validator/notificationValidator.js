import Notification from '../entity/Notification';

let errors = {};

/**
 * Validate the message of the entity
 *
 * @param {string} message
 */
const validateMessage = (message) => {
    if (message.length === 0) {
        errors.message = 'Message cannot be empty';

        return false;
    }

    return true;
};

/**
 * Validate the level of the entity
 *
 * @param {integer} level
 */
const validateLevel = (level) => {
    const levels = [
        Notification.LVL_DEBUG,
        Notification.LVL_INFO,
        Notification.LVL_WARNING,
        Notification.LVL_ERROR,
        Notification.LVL_PANIC,
    ];

    if (!levels.includes(level)) {
        errors.level = 'Invalid level value';

        return false;
    }

    return true;
};

/**
 * Validate the namespace of the entity
 *
 * @param {string} namespace
 */
const validateNamespace = (namespace) => {
    if (namespace.length === 0) {
        errors.namespace = 'Namespace cannot be empty';

        return false;
    }

    return true;
};

/**
 * Validate the origin of the entity
 *
 * @param {string} origin
 */
const validateOrigin = (origin) => {
    if (origin.length === 0) {
        errors.origin = 'Origin cannot be empty';

        return false;
    }

    const origins = ['http', 'cli', 'cron'];
    if (!origins.includes(origin)) {
        errors.origin = 'Origin must be either "http", "cli" or "cron"';

        return false;
    }

    return true;
};

/**
 * Validate the reportedAt of the entity
 *
 * @param {string} reportedAt
 */
const validateReportedAt = (reportedAt) => {
    if (`${reportedAt}`.length === 0) {
        errors.reportedAt = 'Report date and time cannot be empty';

        return false;
    }

    return true;
};

const validate = notification => new Promise((resolve) => {
    errors = {};

    validateMessage(notification.message || '');
    validateLevel(notification.level || 2);
    validateNamespace(notification.namespace || '');
    validateOrigin(notification.origin || '');
    validateReportedAt(notification.reportedAt || '');

    resolve({
        valid: Object.keys(errors).length === 0,
        errors,
    });
});

export default validate;
