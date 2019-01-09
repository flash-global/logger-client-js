import { configs, hasBeenConfigured } from './configure.js';

import Notification from '../src/entity/Notification';

export default function (criteria = {}) {
    hasBeenConfigured();

    const queryString = Object
        .keys(criteria)
        .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(criteria[key])}`)
        .join('&');

    return new Promise((resolve, reject) => {
        fetch(`${configs.url}?${queryString}`)
            .then((response) => {
                if (response.ok === false) {
                    return reject(response);
                }

                return response.json()
                    .then((data) => {
                        const notifications = Object
                            .values(data.data)
                            .map(notif => new Notification(notif));

                        return resolve(notifications);
                    });
            });
    });
}
