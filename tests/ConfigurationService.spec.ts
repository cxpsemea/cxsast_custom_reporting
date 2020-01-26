import PropertiesReader = require('properties-reader');
import flatten = require('flat');
import { ensureFileSync, removeSync } from 'fs-extra';
// import { ConfigurationService } from '../source/services';
import { CONFIG_FILE } from '../source/common/Constants';

const TEMPLATE = {
    sast: {
        url: 'http://127.0.0.1',
        username: 'username',
        password: 'password',
    },
    smtp: {
        host: '127.0.0.1',
        port: '465',
        username: 'username',
        password: 'password',
        sender: 'test@test.com',
    },
};

let ConfigurationService: any;

async function createConfig(obj: any) {
    ensureFileSync(CONFIG_FILE);
    // @ts-ignore
    const props = new PropertiesReader(CONFIG_FILE);
    const flatenObj = flatten(obj, {}) as any;

    Object.keys(flatenObj).forEach(async key => {
        if (flatenObj[key]) {
            await props.set(key, flatenObj[key]);
        }
    });

    await props.save(CONFIG_FILE);
}

function removeConfig() {
    removeSync(CONFIG_FILE);
}

describe('ConfigurationService', () => {
    describe('Global Configuration', () => {
        beforeEach(() => {
            jest.resetModules();
            ConfigurationService = require('../source/services/ConfigurationService/ConfigurationService').default;
        });

        afterEach(() => {
            removeConfig();
        });

        test('ensure same instance is retrieved', async done => {
            await createConfig(TEMPLATE);
            const cnf1 = ConfigurationService.getConfig();
            const cnf2 = ConfigurationService.getConfig();
            expect(cnf1).toEqual(cnf2);
            done();
        });

        test('ensure sensitive data is not printed then using toString()', async done => {
            await createConfig(TEMPLATE);
            const cnfString = ConfigurationService.getConfig().toString();
            const tmp = JSON.parse(cnfString);
            expect(tmp.sast.username).toBe('******');
            expect(tmp.sast.password).toBe('******');
            expect(tmp.smtp.username).toBe('******');
            expect(tmp.smtp.password).toBe('******');
            done();
        });

        test('throw CO_MISSING_CONFIG_FILE when configuration file is not accessible', async done => {
            await createConfig(TEMPLATE);
            removeConfig();
            try {
                ConfigurationService.getConfig();
                done('expected to throw CO_MISSING_CONFIG_FILE');
            } catch (e) {
                expect(e.code).toBe('CO_MISSING_CONFIG_FILE');
                expect(e.message).toBe(`CO_MISSING_CONFIG_FILE: Missing configuration file. Could not access file on "${CONFIG_FILE}"`);
                done();
            }
        });

        const testCases: any[] = [
            {
                key: 'sast.url',
                name: 'is undefined',
                config: { ...TEMPLATE, sast: { ...TEMPLATE.sast, url: undefined } },
                errCode: 'CO_MISSING_CONFIG_KEY',
                errMsg: 'CO_MISSING_CONFIG_KEY: Missing configuration key "sast.url"',
            },
            {
                key: 'sast.url',
                name: 'is invalid (sast.url=abc123)',
                config: { ...TEMPLATE, sast: { ...TEMPLATE.sast, url: 'abc123' } },
                errCode: 'CO_INVALID_CONFIG_KEY',
                errMsg: 'CO_INVALID_CONFIG_KEY: Invalid configuration key "sast.url"',
            },
            {
                key: 'sast.url',
                name: 'is invalid (sast.url=ftp://test.com)',
                config: { ...TEMPLATE, sast: { ...TEMPLATE.sast, url: 'ftp://test.com' } },
                errCode: 'CO_INVALID_CONFIG_KEY',
                errMsg: 'CO_INVALID_CONFIG_KEY: Invalid configuration key "sast.url"',
            },
            {
                key: 'sast.url',
                name: 'is invalid (sast.url=http://test)',
                config: { ...TEMPLATE, sast: { ...TEMPLATE.sast, url: 'http://test' } },
                errCode: 'CO_INVALID_CONFIG_KEY',
                errMsg: 'CO_INVALID_CONFIG_KEY: Invalid configuration key "sast.url"',
            },
            {
                key: 'sast.url',
                name: 'is invalid (sast.url=sftp://test.com)',
                config: { ...TEMPLATE, sast: { ...TEMPLATE.sast, url: 'sftp://test.com' } },
                errCode: 'CO_INVALID_CONFIG_KEY',
                errMsg: 'CO_INVALID_CONFIG_KEY: Invalid configuration key "sast.url"',
            },
            {
                key: 'sast.url',
                name: 'is invalid (sast.url=file://test.com)',
                config: { ...TEMPLATE, sast: { ...TEMPLATE.sast, url: 'file://test.com' } },
                errCode: 'CO_INVALID_CONFIG_KEY',
                errMsg: 'CO_INVALID_CONFIG_KEY: Invalid configuration key "sast.url"',
            },
            {
                key: 'sast.username',
                name: 'is undefined',
                config: { ...TEMPLATE, sast: { ...TEMPLATE.sast, username: undefined } },
                errCode: 'CO_MISSING_CONFIG_KEY',
                errMsg: 'CO_MISSING_CONFIG_KEY: Missing configuration key "sast.username"',
            },
            {
                key: 'sast.password',
                name: 'is undefined',
                config: { ...TEMPLATE, sast: { ...TEMPLATE.sast, password: undefined } },
                errCode: 'CO_MISSING_CONFIG_KEY',
                errMsg: 'CO_MISSING_CONFIG_KEY: Missing configuration key "sast.password"',
            },
            // ################################################################
            // # scenarios for SMTP configuration
            // ################################################################
            {
                key: 'smtp.host',
                name: 'is undefined',
                config: { ...TEMPLATE, smtp: { ...TEMPLATE.smtp, host: undefined } },
                errCode: 'CO_MISSING_CONFIG_KEY',
                errMsg: 'CO_MISSING_CONFIG_KEY: Missing configuration key "smtp.host"',
            },
            {
                key: 'smtp.port',
                name: 'is undefined',
                config: { ...TEMPLATE, smtp: { ...TEMPLATE.smtp, port: undefined } },
                errCode: 'CO_MISSING_CONFIG_KEY',
                errMsg: 'CO_MISSING_CONFIG_KEY: Missing configuration key "smtp.port"',
            },
            {
                key: 'smtp.username',
                name: 'is undefined',
                config: { ...TEMPLATE, smtp: { ...TEMPLATE.smtp, username: undefined } },
                errCode: 'CO_MISSING_CONFIG_KEY',
                errMsg: 'CO_MISSING_CONFIG_KEY: Missing configuration key "smtp.username"',
            },
            {
                key: 'smtp.password',
                name: 'is undefined',
                config: { ...TEMPLATE, smtp: { ...TEMPLATE.smtp, password: undefined } },
                errCode: 'CO_MISSING_CONFIG_KEY',
                errMsg: 'CO_MISSING_CONFIG_KEY: Missing configuration key "smtp.password"',
            },

            {
                key: 'sast.url',
                name: 'is valid (sast.url=http://test.com)',
                config: { ...TEMPLATE, sast: { ...TEMPLATE.sast, url: 'http://test.com' } },
            },
            {
                key: 'sast.url',
                name: 'is valid (sast.url=http://test.com:10000)',
                config: { ...TEMPLATE, sast: { ...TEMPLATE.sast, url: 'http://test.com:10000' } },
            },
            {
                key: 'sast.url',
                name: 'is valid (sast.url=http://127.0.0.1)',
                config: { ...TEMPLATE, sast: { ...TEMPLATE.sast, url: 'http://127.0.0.1' } },
            },
            {
                key: 'sast.url',
                name: 'is valid (sast.url=http://127.0.0.1:10000)',
                config: { ...TEMPLATE, sast: { ...TEMPLATE.sast, url: 'http://127.0.0.1:10000' } },
            },
            {
                key: 'sast.url',
                name: 'is valid (sast.url=https://test.com)',
                config: { ...TEMPLATE, sast: { ...TEMPLATE.sast, url: 'https://test.com' } },
            },
            {
                key: 'sast.url',
                name: 'is valid (sast.url=https://test.com:10000)',
                config: { ...TEMPLATE, sast: { ...TEMPLATE.sast, url: 'https://test.com:10000' } },
            },
            {
                key: 'sast.url',
                name: 'is valid (sast.url=https://127.0.0.1)',
                config: { ...TEMPLATE, sast: { ...TEMPLATE.sast, url: 'https://127.0.0.1' } },
            },
            {
                key: 'sast.url',
                name: 'is valid (sast.url=https://127.0.0.1:10000)',
                config: { ...TEMPLATE, sast: { ...TEMPLATE.sast, url: 'https://127.0.0.1:10000' } },
            },
            {
                key: 'smtp.host',
                name: 'is valid (smtp.host=local.net)',
                config: { ...TEMPLATE, smtp: { ...TEMPLATE.smtp, smtp: 'local.net' } },
            },
            {
                key: 'smtp.host',
                name: 'is valid (smtp.host=127.0.0.1)',
                config: { ...TEMPLATE, smtp: { ...TEMPLATE.smtp, smtp: '127.0.0.1' } },
            },
        ];

        testCases.forEach(testCase => {
            if (!testCase.errCode) {
                test(`${testCase.name}`, async done => {
                    await createConfig(testCase.config);
                    process.nextTick(() => {
                        const cnf = ConfigurationService.getConfig();
                        const c1 = flatten(testCase.config) as any;
                        const c2 = flatten(cnf) as any;
                        expect(c2[testCase.key]).toBe(c1[testCase.key]);
                        done();
                    });
                });
            } else {
                test(`throw ${testCase.errCode} when ${testCase.key} ${testCase.name}`, async done => {
                    await createConfig(testCase.config);
                    try {
                        ConfigurationService.getConfig();
                        done(`expected to throw ${testCase.errCode} when ${testCase.key} ${testCase.name}`);
                    } catch (e) {
                        expect(e.code).toBe(testCase.errCode);
                        expect(e.message).toBe(testCase.errMsg);
                        done();
                    }
                });
            }
        });
    });
});
