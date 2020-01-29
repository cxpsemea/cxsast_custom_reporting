import { readFileSync } from 'fs-extra';

export function readFile(path: string) {
    try {
        const val = readFileSync(path, { encoding: 'UTF8' });
        return val;
    } catch (e) {
        // TODO: add proper application error
        throw new Error(`Could not read file ${path}`);
    }
}
