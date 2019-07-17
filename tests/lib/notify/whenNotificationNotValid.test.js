import notify from '../../../lib/notify.js';
import Notification from '../../../src/entity/Notification.js';

jest.mock('../../../lib/configure', () => ({
    hasBeenConfigured: () => null,
    configs: {

    },
}));

describe('Testing the Notify function when the notification is not valid', () => {
    const result = notify(new Notification({
        message: '',
        level: 17,
    }));

    it('should be rejected with errors', () => result
        .catch((e) => {
            expect(e).toEqual({
                message: 'Message cannot be empty',
                level: 'Invalid level value',
            });
        }));
});
