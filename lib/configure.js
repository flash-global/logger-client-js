const Notification = require('./../src/entity/Notification.js');

let configured = false;
let configs = {
    filterLevel: Notification.LVL_ERROR,
};

exports.hasBeenConfigured = () => {
    if (configured === false) {
        throw new Error('Please configure the client before using it!');
    }
};

exports.configs = configs;

exports.configure = (configurations) => {
    Object.assign(configs, configurations);

    if (configs.url) {
        configured = true;
    }
};
