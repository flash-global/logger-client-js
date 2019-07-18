const { Response } = require('whatwg-fetch');
const { configure, configs } = require('./../../../lib/configure');
const retrieve = require('./../../../lib/retrieve');
const Notification = require('./../../../src/entity/Notification');

it("Throw error because there is not configuration", () => {
    const criteriaFixture = {notification_message: 'test'};
    return expect(retrieve(criteriaFixture)).rejects.toThrow("Please configure the client before using it!");
});

it("Reject because response not ok", () => {
    const urlFixture = 'http://logger-api.local';
    const criteriaFixture = {notification_message: 'test'};

    const responseFixture = new Response();
    const promiseFetchFixture = new Promise((resolve) => resolve(responseFixture));

    responseFixture.ok = false;

    global.fetch = jest.fn();
    global.fetch.mockReturnValueOnce(promiseFetchFixture);

    configure({url: urlFixture});

    return expect(retrieve(criteriaFixture)).rejects.toBe(responseFixture).then(() => {
        expect(global.fetch.mock.calls.length).toEqual(1);
        expect(global.fetch.mock.calls[0][0]).toEqual(`http://logger-api.local/api/notifications?criteria=${JSON.stringify(criteriaFixture)}`);

        delete configs.url;
    });
});

it("Reject because error while sending request", () => {
    const urlFixture = 'http://logger-api.local';
    const criteriaFixture = {notification_message: 'test'};

    const promiseFetchFixture = new Promise((_, reject) => reject("Error"));

    global.fetch = jest.fn();
    global.fetch.mockReturnValueOnce(promiseFetchFixture);

    configure({url: urlFixture});

    return expect(retrieve(criteriaFixture)).rejects.toEqual("Error").then(() => {
        expect(global.fetch.mock.calls.length).toEqual(1);
        expect(global.fetch.mock.calls[0][0]).toEqual(`http://logger-api.local/api/notifications?criteria=${JSON.stringify(criteriaFixture)}`);

        delete configs.url;
    });
});

it("Resolve", () => {
    const urlFixture = 'http://logger-api.local';
    const criteriaFixture = {notification_message: 'test'};
    const notificationFixture = new Notification({message: 'test'});

    const responseFixture = new Response(JSON.stringify({data: [notificationFixture]}));
    const promiseFetchFixture = new Promise((resolve) => resolve(responseFixture));

    global.fetch = jest.fn();
    global.fetch.mockReturnValueOnce(promiseFetchFixture);

    configure({url: urlFixture});

    const resultNotificationFixture = Object.assign({}, notificationFixture);
    delete resultNotificationFixture.reportedAt;

    return expect(retrieve(criteriaFixture)).resolves.toEqual([expect.objectContaining(resultNotificationFixture)]).then(() => {
        expect(global.fetch.mock.calls.length).toEqual(1);

        expect(global.fetch.mock.calls[0][0]).toEqual(`http://logger-api.local/api/notifications?criteria=${JSON.stringify(criteriaFixture)}`);

        delete configs.url;
    });
});

it("Resolve with no criterias", () => {
    const urlFixture = 'http://logger-api.local';
    const notificationFixture = new Notification({message: 'test'});

    const responseFixture = new Response(JSON.stringify({data: [notificationFixture]}));
    const promiseFetchFixture = new Promise((resolve) => resolve(responseFixture));

    global.fetch = jest.fn();
    global.fetch.mockReturnValueOnce(promiseFetchFixture);

    configure({url: urlFixture});

    const resultNotificationFixture = Object.assign({}, notificationFixture);
    delete resultNotificationFixture.reportedAt;

    return expect(retrieve()).resolves.toEqual([expect.objectContaining(resultNotificationFixture)]).then(() => {
        expect(global.fetch.mock.calls.length).toEqual(1);

        expect(global.fetch.mock.calls[0][0]).toEqual(`http://logger-api.local/api/notifications?criteria={}`);

        delete configs.url;
    });
});