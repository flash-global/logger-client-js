import { hasBeenConfigured } from '../../../lib/configure.js';

describe('Testing the Configure function when the client is not configured', () => {
    const result = () => hasBeenConfigured();

    it('should throw an exception', () => {
        expect(result).toThrow(Error);
    });
});
