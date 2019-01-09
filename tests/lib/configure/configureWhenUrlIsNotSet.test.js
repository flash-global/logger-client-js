import configure from '../../../lib/configure.js';

describe('Testing the Configure function when the url is not set', () => {
    const result = configure({});

    it('should return undefined', () => {
        expect(result).toEqual(undefined);
    });
});
