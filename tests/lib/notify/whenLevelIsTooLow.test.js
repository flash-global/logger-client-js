import notify from '../../../lib/notify.js';
import Notification from '../../../src/entity/Notification.js';

jest.mock('../../../lib/configure', () => ({
    hasBeenConfigured: () => null,
    configs: {
        filterLevel: 8,
    },
}));

describe('Testing the Notify function when the level is too low', () => {
    const result = notify(new Notification({
        message: '',
        level: Notification.LVL_DEBUG,
    }));

    it('should return false', () => {
        expect(result).toEqual(false);
    });
});
