import { configs, hasBeenConfigured } from './configure.js';

import Notification from '../src/entity/Notification';
import validate from '../src/validator/notificationValidator';

export default function (log) {
    hasBeenConfigured();

    let notif = log;
    if (log.constructor.name === 'String') {
        notif = new Notification({
            message: log,
            level: Notification.LVL_INFO,
            category: Notification.BUSINESS,
        });
    }

    if (notif.getLevel() < configs.filterLevel) {
        return false;
    }

    notif = Object.assign({
        origin: 'http',
    }, notif);

    return validate(notif)
        .then((v) => {
            if (v.valid) {
                return fetch(configs.url, {
                    method: 'post',
                    body: JSON.stringify(notif),
                });
            }

            throw v.errors;
        });
}
