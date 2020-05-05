import yargs from 'yargs'
import { IArgumentsService, IArgumentsObject } from './ArgumentsService'
import { argumentsValidator, argumentsSanitizer } from './ArgumentsHelpers'
import {
  ARGS_PROJECT_NAME,
  ARGS_PROJECT_NAME_PATTERN,
  ARGS_PROJECT_XML_REPORT,
  ARGS_REPORT_AUDIENCE,
  ARGS_REPORT_TEMPLATE,
  ARGS_REPORT_TYPE,
  DEFAULT_REPORT_TYPE,
  REPORT_TYPE_CONSOLIDATED,
  REPORT_TYPE_SCANSUMMARY,
  CONFIG_FILE_KEY_PDF_PATH,
} from '../../common/Constants'

export default class ArgumentsServiceImpl implements IArgumentsService {
  private userInput: any
  private args: IArgumentsObject

  constructor() {
    yargs.middleware(argumentsSanitizer)
    yargs.middleware(argumentsValidator)

    this.userInput = yargs
      .alias('v', 'version')
      .alias('h', 'help')
      .version(require('../../../package.json').version)
      .command('$0', 'Sast report generator:', (commandYargs: any) => {
        commandYargs
          .positional(ARGS_REPORT_TYPE, {
            describe: `the type of the report: ${REPORT_TYPE_SCANSUMMARY}|${REPORT_TYPE_CONSOLIDATED} - default: ${DEFAULT_REPORT_TYPE}`,
            alias: '-t',
            // default: set on the sanitizers,
          })
          .positional(ARGS_REPORT_TEMPLATE, {
            describe: 'the name of the html template on the config/templates folder',
            alias: '-m',
            // default: set on the sanitizers,
          })
          .positional(ARGS_PROJECT_XML_REPORT, {
            describe: `the path to the xml report (required if ${ARGS_REPORT_TYPE} =  ${REPORT_TYPE_SCANSUMMARY})`,
            alias: '-x',
          })
          .positional(ARGS_REPORT_AUDIENCE, {
            describe: `a comma-separated list of emails that will receive the report (required if the config ${CONFIG_FILE_KEY_PDF_PATH} is undefined)`,
            alias: '-e',
          })
          .positional(ARGS_PROJECT_NAME_PATTERN, {
            describe: 'the projects name regex we want to match',
            alias: '-p',
          })
          .positional(ARGS_PROJECT_NAME, {
            describe: 'the project name that will be displayed on the title of the cosolidated report',
            alias: '-n',
          })
      })
      .help().argv

    this.args = {
      report: {
        type: this.userInput[ARGS_REPORT_TYPE],
        template: this.userInput[ARGS_REPORT_TEMPLATE],
        audience: this.userInput[ARGS_REPORT_AUDIENCE],
      },
      project: {
        xmlReport: this.userInput[ARGS_PROJECT_XML_REPORT],
        namePattern: this.userInput[ARGS_PROJECT_NAME_PATTERN],
        name: this.userInput[ARGS_PROJECT_NAME],
      },
    }
  }

  public getArgs(): IArgumentsObject {
    return this.args
  }
}
