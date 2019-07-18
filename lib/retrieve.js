const { configs, hasBeenConfigured } = require('./configure.js');
const Notification = require('./../src/entity/Notification');

module.exports = (criteria = {}) => new Promise((resolve, reject) => {
    hasBeenConfigured();

    fetch(`${configs.url}/api/notifications?criteria=${JSON.stringify(criteria)}`).then((response) => {
        if (response.ok === false) {
            return reject(response);
        }

        response.json().then((result) => {
            const notifications = result.data.map((content) => new Notification(content));
            resolve(notifications);
        });
    }).catch((error) => reject(error));
});
