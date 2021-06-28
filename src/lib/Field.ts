import { PIXError } from '../utils/Errors'
import { FIELD_CONFIG, IDS } from './constants'

export interface ParsedInnerField {
  id: string
  size: number
}

export interface ParsedField {
  id: string
  size: number
  data: string | ParsedInnerField[]
  rest: string | null
}

class Field {
  /**
   * @example Field.parse('000201'); // { id: '00', size: 2, data: '01' }
   * @param id ID from this field
   * @param data Data from this field
   * @returns Parsed field
   */
  public parse(field: string): ParsedField {
    const id = field.substr(0, 2)
    if (!Object.values(IDS).includes(id)) throw new PIXError('this id is invalid')
    const config = FIELD_CONFIG[id]

    const size = Number(field.substr(2, 2))
    let data: string | ParsedInnerField[] = field.substr(4, size)
    if (config && config.hasBody) data = this.parseAll(data)
    const rest = field.substr(4 + size) || null

    return {
      id,
      size,
      data,
      rest
    }
  }

  private parseAll(field: string): ParsedInnerField[] {
    const fields = []
    let payloadRest: string | null = field
    while (payloadRest !== null) {
      const field = this.parse(payloadRest)
      payloadRest = field.rest
      fields.push({ id: field.id, data: field.data, size: field.size })
    }
    return fields
  }

  /**
   * @example Field.stringify('00', '01'); // 000201 -> [00:ID][02:size][01:data]
   * @param id ID from this field
   * @param data Data from this field
   * @returns Stringified field
   */
  public stringify(id: string, data: string): string {
    if (!Object.values(IDS).includes(id)) throw new PIXError('this id is invalid')
    const size = String(data.length).padStart(2, '0')

    return `${id}${size}${data}`
  }
}

const field = new Field()

export { field as Field }
