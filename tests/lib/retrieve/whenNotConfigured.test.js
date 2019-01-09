import retrieve from '../../../lib/retrieve.js';

jest.mock('../../../lib/configure', () => ({
    hasBeenConfigured: () => {
        throw new Error('Not Configured');
    },
}));

describe('Testing the Retrieve function when the client is not configured', () => {
    const result = () => retrieve();

    it('should throw an exception', () => {
        expect(result).toThrow(Error);
    });
});
