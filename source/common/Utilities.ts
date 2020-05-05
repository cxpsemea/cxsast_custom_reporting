import { readFileSync } from 'fs-extra'

export const readFile = (path: string) => {
  try {
    return readFileSync(path, { encoding: 'UTF8' })
  } catch (e) {
    // TODO: add proper application error
    throw new Error(`Could not read file ${path}`)
  }
}
