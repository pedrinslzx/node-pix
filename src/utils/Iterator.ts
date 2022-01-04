import { ParsedField } from '../lib/Field'

export function * generateIterator(fields: Omit<ParsedField, 'rest'>[]) {
  yield * fields
}
