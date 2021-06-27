interface ParsedField {
  id: string
  size: number
  data: string
}

class Field {
  /**
   * @example Field.parse('000201'); // { id: '00', size: '02', data: '01' }
   * @param id ID from this field
   * @param data Data from this field
   * @returns Parsed field
   */
  public parse(field: string): ParsedField {
    const id = field.substr(0, 2)
    const size = Number(field.substr(2, 2))
    const data = field.substr(4)

    return {
      id,
      size,
      data
    }
  }

  /**
   * @example Field.stringify('00', '01'); // 000201 -> [00:ID][02:size][01:data]
   * @param id ID from this field
   * @param data Data from this field
   * @returns Stringified field
   */
  public stringify(id: string, data: string): string {
    const size = String(data.length).padStart(2, '0')

    return `${id}${size}${data}`
  }
}

const field = new Field()

export { field as Field }
