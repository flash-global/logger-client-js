const { hasBeenConfigured, configure, configs } = require('./../../../lib/configure');

it("hasBeenConfigured will throw an error because there is no configuration", () => {
    expect(() => {
        hasBeenConfigured();
    }).toThrow("Please configure the client before using it!");
});

it("hasBeenConfigured will throw an exception, bad configuration sent", () => {
    configure({test: 'toto'});

    expect(() => {
        hasBeenConfigured();
    }).toThrow("Please configure the client before using it!");

    delete configs.test;
});

it("hasBeenConfigured will not throw an exception, good configuration sent", () => {
    const configFixture = {url: 'http://logger-api.local', filterLevel: 8, isHttpServer: true};
    configure(configFixture);

    expect(() => {
        hasBeenConfigured();
    }).not.toThrow();

    expect(configs).toEqual(configFixture);

    delete configs.url;
});
