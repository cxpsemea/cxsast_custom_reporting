import { readFileSync } from 'fs-extra';

export function readFile(path: string) {
    const val = readFileSync(path, { encoding: 'UTF8' });

    return val;
}
