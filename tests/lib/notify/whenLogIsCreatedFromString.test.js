import notify from '../../../lib/notify.js';

jest.mock('../../../lib/configure', () => ({
    hasBeenConfigured: () => null,
    configs: {
        filterLevel: 1,
    },
}));

describe('Testing the Notify function when the everything is OK when giviing a string', () => {
    global.fetch = jest.fn().mockImplementation(() => Promise.resolve({
        ok: true,
    }));

    const result = notify('My Message');

    it('should create a log', () => result
        .then((resp) => {
            expect(resp).toEqual({
                ok: true,
            });
        }));
});
