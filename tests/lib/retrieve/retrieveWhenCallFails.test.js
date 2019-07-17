import retrieve from '../../../lib/retrieve.js';

jest.mock('../../../lib/configure', () => ({
    hasBeenConfigured: () => null,
    configs: {
        url: 'http://localhost.fr/api/notifications',
    },
}));

describe('Testing the Retrieve function when everything is OK', () => {
    const fetchConfig = {
        ok: false,
        data: {
            errror: 'Bad Response',
        },
    };

    global.fetch = jest.fn().mockImplementation(() => Promise.resolve(fetchConfig));

    const result = retrieve();

    it('should reject the response', () => {
        result.catch((err) => {
            expect(err).toEqual(fetchConfig);
        });
    });
});
