import { format } from 'util';

/**
 * a definition of an error template
 */
export interface IErrorTemplate {
    code: string;
    message: string;
}

/**
 * implements a base structure for errors
 */
export default class BaseError extends Error {
    public code: string;

    constructor(errorTemplate: IErrorTemplate, ...args: any) {
        args.unshift(errorTemplate.code);
        args.unshift(`%s: ${errorTemplate.message}`);

        super(format.apply(format, args));

        this.code = errorTemplate.code;
        this.name = this.constructor.name;

        Error.captureStackTrace(this, this.constructor);
    }
}
