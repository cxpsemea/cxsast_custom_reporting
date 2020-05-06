import PropertiesReader from 'properties-reader'
import { IConfigurationService, IConfigurationObject } from './ConfigurationService'
import ConfigurationError from './error/ConfigurationError'
import {
  CONFIG_FILE,
  CONFIG_FILE_KEY_SMTP_HOST,
  CONFIG_FILE_KEY_SMTP_PORT,
  CONFIG_FILE_KEY_SMTP_USERNAME,
  CONFIG_FILE_KEY_SMTP_PASSWORD,
  CONFIG_FILE_KEY_SMTP_SENDER,
  CONFIG_FILE_KEY_DATABASE_HOST,
  CONFIG_FILE_KEY_DATABASE_PORT,
  CONFIG_FILE_KEY_DATABASE_USERNAME,
  CONFIG_FILE_KEY_DATABASE_PASSWORD,
  CONFIG_FILE_KEY_LOGGER_LEVEL,
  CONFIG_FILE_KEY_PDF_PATH,
  CONFIG_CHROME_EXE_PATH,
} from '../../common/Constants'
import { isEmpty, isEmail, isFqdn, isIPV4, isInteger } from '../../common/Validator'

enum KeyType {
  EMAIL,
  HOST,
  INTEGER,
  STRING,
}

export default class ConfigurationServiceImpl implements IConfigurationService {
  private props: PropertiesReader.Reader
  private config: IConfigurationObject

  constructor() {
    try {
      this.props = PropertiesReader(CONFIG_FILE)
    } catch (e) {
      throw new ConfigurationError(ConfigurationError.MISSING_CONFIG_FILE, CONFIG_FILE)
    }

    this.config = {
      logger: {
        level: this.parseValue(CONFIG_FILE_KEY_LOGGER_LEVEL, KeyType.STRING),
      },
      database: {
        host: this.parseValue(CONFIG_FILE_KEY_DATABASE_HOST, KeyType.HOST),
        port: this.parseValue(CONFIG_FILE_KEY_DATABASE_PORT, KeyType.INTEGER),
        username: this.parseValue(CONFIG_FILE_KEY_DATABASE_USERNAME, KeyType.STRING),
        password: this.parseValue(CONFIG_FILE_KEY_DATABASE_PASSWORD, KeyType.STRING),
      },
      smtp: {
        host: this.parseValue(CONFIG_FILE_KEY_SMTP_HOST, KeyType.HOST),
        port: this.parseValue(CONFIG_FILE_KEY_SMTP_PORT, KeyType.INTEGER),
        username: this.parseValue(CONFIG_FILE_KEY_SMTP_USERNAME, KeyType.STRING),
        password: this.parseValue(CONFIG_FILE_KEY_SMTP_PASSWORD, KeyType.STRING),
        sender: this.parseValue(CONFIG_FILE_KEY_SMTP_SENDER, KeyType.EMAIL),
      },
      pdf: {
        chromeExePath: this.parseValue(CONFIG_CHROME_EXE_PATH, KeyType.STRING, false),
        outputPath: this.parseValue(CONFIG_FILE_KEY_PDF_PATH, KeyType.STRING, false),
      },
      toString: () =>
        JSON.stringify({
          ...this.config,
          database: { ...this.config.database, username: '******', password: '******' },
          smtp: { ...this.config.smtp, username: '******', password: '******' },
        }),
    }
  }

  public getConfig(): IConfigurationObject {
    return this.config
  }

  private parseValue(key: string, keyType: KeyType, required: boolean = true): string {
    let val = String(this.props.get(key))

    if (isEmpty(val) && key === CONFIG_FILE_KEY_LOGGER_LEVEL) {
      val = 'info'
    }

    if (isEmpty(val) && required) {
      throw new ConfigurationError(ConfigurationError.MISSING_CONFIG_KEY, key)
    }

    switch (keyType) {
      case KeyType.HOST:
        if (!isFqdn(val) && !isIPV4(val)) {
          throw new ConfigurationError(
            // @ts-ignore
            ConfigurationError[INVALID_CONFIG_KEY],
            key
          )
        }
        break

      case KeyType.EMAIL:
        if (!isEmail(val)) {
          // @ts-ignore
          throw new ConfigurationError(
            // @ts-ignore
            ConfigurationError[INVALID_CONFIG_KEY],
            key
          )
        }
        break

      case KeyType.INTEGER:
        if (!isInteger(val)) {
          throw new ConfigurationError(
            // @ts-ignore
            ConfigurationError[INVALID_CONFIG_KEY],
            key
          )
        }
        break
    }

    return val
  }
}
