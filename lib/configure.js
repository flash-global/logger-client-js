import Notification from '../src/entity/Notification.js';

let configured = false;

export const hasBeenConfigured = function hasBeenConfigured() {
    if (configured === false) {
        throw new Error('Please configure the client before using it!');
    }
};

export const configs = {
    filterLevel: Notification.LVL_ERROR,
};

export default function (configurations) {
    Object.assign(configs, configurations);

    if (configs.url) {
        configured = true;
    }
}
