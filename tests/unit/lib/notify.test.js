const { Response } = require('whatwg-fetch');
const { configure, configs } = require('./../../../lib/configure');
const notify = require('./../../../lib/notify');
const Notification = require('./../../../src/entity/Notification');

it("Throw error because there is not configuration", () => {
    const notificationFixture = new Notification({message: 'test'});
    return expect(notify(notificationFixture)).rejects.toThrow("Please configure the client before using it!");
});

it("Reject because too low level", () => {
    const urlFixture = 'http://logger.local';
    const notificationFixture = new Notification();
    const errorsFixture = 'too low level';

    configure({url: urlFixture});

    return expect(notify(notificationFixture)).rejects.toEqual(errorsFixture).then(() => delete configs.url);
});

it("Reject because validation", () => {
    const urlFixture = 'http://logger.local';
    const notificationFixture = new Notification();
    const levelFixture = 1;
    const errorsFixture = { message: "Message cannot be empty" };

    configure({url: urlFixture, filterLevel: levelFixture});

    return expect(notify(notificationFixture)).rejects.toEqual(errorsFixture).then(() => delete configs.url);
});

it("Reject because response not ok", () => {
    const urlFixture = 'http://logger.local';
    const notificationFixture = new Notification({message: 'test'});
    const levelFixture = 1;

    const responseFixture = new Response();
    const promiseFetchFixture = new Promise((resolve) => resolve(responseFixture));

    responseFixture.ok = false;

    global.fetch = jest.fn();
    global.fetch.mockReturnValueOnce(promiseFetchFixture);

    configure({url: urlFixture, filterLevel: levelFixture});

    return expect(notify(notificationFixture)).rejects.toBe(responseFixture).then(() => {
        notificationFixture.origin = 'http';

        expect(global.fetch.mock.calls.length).toEqual(1);
        expect(global.fetch.mock.calls[0][0]).toEqual(`http://logger.local/api/notifications`);
        expect(global.fetch.mock.calls[0][1]).toEqual({
            method: 'POST',
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: `notification=${JSON.stringify(notificationFixture.toJson())}`,
        });

        delete configs.url;
    });
});

it("Reject because error while sending request", () => {
    const urlFixture = 'http://logger.local';
    const notificationFixture = new Notification({message: 'test'});
    const levelFixture = 1;

    const promiseFetchFixture = new Promise((_, reject) => reject("Error"));

    global.fetch = jest.fn();
    global.fetch.mockReturnValueOnce(promiseFetchFixture);

    configure({url: urlFixture, filterLevel: levelFixture});

    return expect(notify(notificationFixture)).rejects.toEqual("Error").then(() => {
        notificationFixture.origin = 'http';

        expect(global.fetch.mock.calls.length).toEqual(1);
        expect(global.fetch.mock.calls[0][0]).toEqual(`http://logger.local/api/notifications`);
        expect(global.fetch.mock.calls[0][1]).toEqual({
            method: 'POST',
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: `notification=${JSON.stringify(notificationFixture.toJson())}`,
        });

        delete configs.url;
    });
});

it("Resolve", () => {
    const urlFixture = 'http://logger.local';
    const responseDataFixture = {message: 'test'};
    const notificationFixture = new Notification({message: 'test'});
    const levelFixture = 1;

    const responseFixture = new Response(JSON.stringify(responseDataFixture));
    const promiseFetchFixture = new Promise((resolve) => resolve(responseFixture));

    global.fetch = jest.fn();
    global.fetch.mockReturnValueOnce(promiseFetchFixture);

    configure({url: urlFixture, filterLevel: levelFixture});

    return expect(notify(notificationFixture)).resolves.toEqual(responseDataFixture).then(() => {
        notificationFixture.origin = 'http';

        expect(global.fetch.mock.calls.length).toEqual(1);
        expect(global.fetch.mock.calls[0][0]).toEqual(`http://logger.local/api/notifications`);
        expect(global.fetch.mock.calls[0][1]).toEqual({
            method: 'POST',
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: `notification=${JSON.stringify(notificationFixture.toJson())}`,
        });

        delete configs.url;
    });
});
