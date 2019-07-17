import notify from '../../../lib/notify.js';
import Notification from '../../../src/entity/Notification.js';

jest.mock('../../../lib/configure', () => ({
    hasBeenConfigured: () => {
        throw new Error('Not Configured');
    },
}));

describe('Testing the Notify function when the client is not configured', () => {
    const result = () => notify(new Notification());

    it('should throw an exception', () => {
        expect(result).toThrow(Error);
    });
});
