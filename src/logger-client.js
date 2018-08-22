import managerFactory from './Factory/managerFactory';

export default class LoggerClient {
    /**
     * @param {Object} config
     */
    constructor(config) {
        this.defaultConfig = {
            baseUrl: ''
        };

        this.config = {};

        /** @type {Manager} */
        this.manager = null;

        this.mergeConfig(config);
        this.initManager();
    }

    /**
     * @param {Object} config
     */
    mergeConfig(config) {
        Object.assign(this.config, this.defaultConfig, config);
    }

    /**
     *
     */
    initManager() {
        this.manager = managerFactory(this.config);
        this.manager.init();
    }

}
