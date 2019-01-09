import Notification from '../../../src/entity/Notification.js';

describe('Testing the constructor', () => {
    const notif = new Notification({
        message: 'Test',
        level: Notification.LVL_DEBUG,
        fakeData: 'fake',
    });

    it('should have hydrated the entity', () => {
        const expected = new Notification();
        expected.message = 'Test';
        expected.level = Notification.LVL_DEBUG;
        expected.reportedAt = notif.reportedAt;
        expected.fakeData = 'fake';

        expect(notif).toEqual(expected);
    });
});

describe('Testing id accessor', () => {
    const notif = new Notification();
    notif.setId(1);

    it('should have 1 in the id property', () => {
        expect(notif.id).toEqual(1);
        expect(notif.getId()).toEqual(1);
    });
});

describe('Testing reportedAt accessor', () => {
    const date = new Date('2020-12-12');

    const notif = new Notification();
    notif.setReportedAt(date);

    it('should have the right date in the reportedAt property', () => {
        expect(notif.reportedAt).toEqual(date);
        expect(notif.getReportedAt()).toEqual(date);
    });
});

describe('Testing flags accessor', () => {
    const notif = new Notification();
    notif.setFlags(4);

    it('should have 4 in the flags property', () => {
        expect(notif.flags).toEqual(4);
        expect(notif.getFlags()).toEqual(4);
    });
});

describe('Testing namespace accessor', () => {
    const notif = new Notification();
    notif.setNamespace('/ns');

    it('should have /ns in the namespace property', () => {
        expect(notif.namespace).toEqual('/ns');
        expect(notif.getNamespace()).toEqual('/ns');
    });
});

describe('Testing message accessor', () => {
    const notif = new Notification();
    notif.setMessage('MyMessge');

    it('should have MyMessge in the message property', () => {
        expect(notif.message).toEqual('MyMessge');
        expect(notif.getMessage()).toEqual('MyMessge');
    });
});

describe('Testing backtrace accessor', () => {
    const notif = new Notification();
    notif.setBacktrace('MyBackTrace');

    it('should have MyBackTrace in the backtrace property', () => {
        expect(notif.backtrace).toEqual('MyBackTrace');
        expect(notif.getBacktrace()).toEqual('MyBackTrace');
    });
});

describe('Testing user accessor', () => {
    const notif = new Notification();
    notif.setUser(1);

    it('should have 1 in the user property', () => {
        expect(notif.user).toEqual(1);
        expect(notif.getUser()).toEqual(1);
    });
});

describe('Testing server accessor', () => {
    const notif = new Notification();
    notif.setServer('serv');

    it('should have serv in the server property', () => {
        expect(notif.server).toEqual('serv');
        expect(notif.getServer()).toEqual('serv');
    });
});

describe('Testing command accessor', () => {
    const notif = new Notification();
    notif.setCommand('exec');

    it('should have exec in the command property', () => {
        expect(notif.command).toEqual('exec');
        expect(notif.getCommand()).toEqual('exec');
    });
});

describe('Testing origin accessor', () => {
    const notif = new Notification();
    notif.setOrigin('http');

    it('should have http in the origin property', () => {
        expect(notif.origin).toEqual('http');
        expect(notif.getOrigin()).toEqual('http');
    });
});

describe('Testing origin accessor with a wrong value', () => {
    const notif = new Notification();
    const res = () => notif.setOrigin('fake');

    it('should throw an Error', () => {
        expect(res).toThrow(Error);
    });
});

describe('Testing category accessor', () => {
    const notif = new Notification();
    notif.setCategory(8);

    it('should have 8 in the category property', () => {
        expect(notif.category).toEqual(8);
        expect(notif.getCategory()).toEqual(8);
    });
});

describe('Testing env accessor', () => {
    const notif = new Notification();
    notif.setEnv('prod');

    it('should have prod in the env property', () => {
        expect(notif.env).toEqual('prod');
        expect(notif.getEnv()).toEqual('prod');
    });
});

describe('Testing context accessor', () => {
    const expected = {
        a: 1,
        b: 2,
    };

    const notif = new Notification();
    notif.setContext(expected);

    it('should have the expected object in the context property', () => {
        expect(notif.context).toEqual(expected);
        expect(notif.getContext()).toEqual(expected);
    });
});
