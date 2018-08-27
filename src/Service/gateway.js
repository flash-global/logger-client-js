export default class Gateway {
    constructor() {
        this.loggerBaseUrl = 'http://toto.com';
    }

    /**
     * @param {String} loggerBaseUrl
     */
    set baseUrl(loggerBaseUrl = null) {
        const lastCharacter = loggerBaseUrl.substr(loggerBaseUrl.length - 1);

        if (lastCharacter === '/') {
            loggerBaseUrl = loggerBaseUrl.substr(0, loggerBaseUrl.length - 1);
        }
        this.loggerBaseUrl = loggerBaseUrl;
    }
}
