import validate from '../../../src/validator/notificationValidator.js';
import Notification from '../../../src/entity/Notification.js';

describe('Testing the validator when errors occured', () => {
    const notif = new Notification({
        message: '',
        levels: 666,
        namespace: '',
        reportedAt: '',
    });
    notif.origin = '';

    it('should have the errors', () => {
        validate(notif)
            .then((data) => {
                expect(data).toEqual({
                    valid: false,
                    errors: {
                        message: 'Message cannot be empty',
                        namespace: 'Namespace cannot be empty',
                        origin: 'Origin cannot be empty',
                        reportedAt: 'Report date and time cannot be empty',
                    },
                });
            });
    });

    const notif2 = JSON.parse(JSON.stringify(notif));
    notif2.origin = 'fake';
    it('should have the errors for the origin', () => {
        validate(notif2)
            .then((data) => {
                expect(data).toEqual({
                    valid: false,
                    errors: {
                        message: 'Message cannot be empty',
                        namespace: 'Namespace cannot be empty',
                        origin: 'Origin must be either "http", "cli" or "cron"',
                        reportedAt: 'Report date and time cannot be empty',
                    },
                });
            });
    });
});
