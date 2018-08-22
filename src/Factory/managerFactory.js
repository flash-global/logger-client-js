import gatewayFactory from './gatewayFactory';
import Manager from '../Service/manager';

/**
 * @param {Object} config
 * @returns {Manager}
 */
export default function (config) {
    const manager = new Manager();

    manager.gateway = gatewayFactory(config);

    return manager;
}
