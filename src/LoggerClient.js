import NotificationEntity from './entity/Notification.js';

import configureLib from '../lib/configure.js';
import notifyLib from '../lib/notify.js';
import retrieveLib from '../lib/retrieve.js';

export const configure = configureLib;
export const notify = notifyLib;
export const retrieve = retrieveLib;
export const Notification = NotificationEntity;
