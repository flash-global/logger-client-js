import notify from '../../../lib/notify.js';
import Notification from '../../../src/entity/Notification.js';

jest.mock('../../../lib/configure', () => ({
    hasBeenConfigured: () => null,
    configs: {
        filterLevel: 8,
    },
}));

describe('Testing the Notify function when the everything is OK', () => {
    global.fetch = jest.fn().mockImplementation(() => Promise.resolve({
        ok: true,
    }));

    const result = notify(new Notification({
        message: 'My Message',
        level: Notification.LVL_PANIC,
    }));

    it('should create a log', () => result
        .then((resp) => {
            expect(resp).toEqual({
                ok: true,
            });
        }));
});
