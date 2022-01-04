import { PIXError } from '../utils/Errors'
import { FIELD_CONFIG, IDS } from './constants'

export interface ParsedField {
  id: string
  size: number
  data: string | ParsedField[]
}

export interface ParsedFieldWithRest extends ParsedField {
  rest: string | null
}

class Field {
  /**
   * @example Field.parse('000201'); // { id: '00', size: 2, data: '01' }
   * @param id ID from this field
   * @param data Data from this field
   * @returns Parsed field
   */
  public parseOne(field: string): ParsedFieldWithRest {
    const id = field.substring(0, 2)
    const size = field.substring(2, 4)
    if (!Object.values(IDS).includes(id)) {
      throw new PIXError(`this id<${id}> is invalid`)
    }

    const config = FIELD_CONFIG.find(fieldConfig => fieldConfig.id === id)

    let data: string | ParsedField[] = field.substring(4, 4 + Number(size))
    if (config && config.hasBody) data = this.parse(data)
    let rest: string | null = field.replace(
      field.substring(0, 4 + Number(size)),
      ''
    )
    if (rest === '') rest = null

    return {
      id,
      size: Number(size),
      data,
      rest
    }
  }

  public parse(field: string): ParsedField[] {
    const fields = []
    let payloadRest: string | null = field

    while (typeof payloadRest === 'string' && payloadRest.length > 0) {
      const field = this.parseOne(payloadRest)
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
    if (!Object.values(IDS).includes(id)) {
      throw new PIXError('this id is invalid')
    }
    const size = String(data.length).padStart(2, '0')

    return `${id}${size}${data}`
  }
}

const field = new Field()

export { field as Field }
