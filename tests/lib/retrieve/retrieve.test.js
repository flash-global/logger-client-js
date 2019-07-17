import retrieve from '../../../lib/retrieve.js';
import Notification from '../../../src/entity/Notification.js';

jest.mock('../../../lib/configure', () => ({
    hasBeenConfigured: () => null,
    configs: {
        url: 'http://localhost.fr/api/notifications',
    },
}));

describe('Testing the Retrieve function when everything is OK', () => {
    global.fetch = jest.fn().mockImplementation(() => Promise.resolve({
        ok: true,
        json: () => new Promise(res => res({
            data: [
                {
                    message: 'First Notif',
                },
            ],
        })),
    }));

    const result = retrieve({
        message: 'msg',
    });

    it('should returns notifications', () => {
        result
            .then((resp) => {
                const notif1 = new Notification({
                    message: 'First Notif',
                });

                notif1.reportedAt = resp[0].reportedAt;

                expect(resp).toEqual([
                    notif1,
                ]);
            });
    });
});
