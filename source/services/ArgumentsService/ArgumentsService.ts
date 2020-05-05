import ArgumentsServiceImpl from './ArgumentsServiceImpl'

/**
 * defines how a Arguments service should be
 */
export interface IArgumentsService {
  getArgs(): IArgumentsObject
}

export interface IArgumentsObject {
  report: {
    type: string
    template: string
    audience: string[]
  }
  project: {
    xmlReport?: string
    namePattern?: string
    name?: string
  }
}

let instance: IArgumentsService

/**
 * a singleton to retrieve the logger service
 */
export default class ArgumentsService {
  /**
   * retrieves the current instance of ArgumentsService
   */
  public static getArgs(): IArgumentsObject {
    if (!instance) {
      instance = new ArgumentsServiceImpl()
    }
    return instance.getArgs()
  }
}
