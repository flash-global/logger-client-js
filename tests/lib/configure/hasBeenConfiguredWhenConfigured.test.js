import configure, { hasBeenConfigured } from '../../../lib/configure.js';

describe('Testing the Configure function when the client is configured', () => {
    configure({
        url: 'http://localhost.fr',
    });

    const result = hasBeenConfigured();

    it('should not return anything', () => {
        expect(result).toEqual(undefined);
    });
});
