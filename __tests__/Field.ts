import { Field } from '../src/lib/Field'

describe('Payload.parse', () => {
  test('should be parse the Payload Format Indicator', () => {
    const fieldInString = '000201'
    const fieldParsed = Field.parse(fieldInString)
    expect(fieldParsed).toMatchObject({ id: '00', size: 2, data: '01' })
  })

  test('should be parse the Payload Format Indicator with Country Code', () => {
    const fieldInString = '0002015802BR'
    const fieldParsed = Field.parse(fieldInString)
    expect(fieldParsed).toMatchObject({ id: '00', size: 2, data: '01', rest: '5802BR' })
  })


  test('should be throw Error when pass a invalid id', () => {
    expect(() => Field.parse('990201')).toThrow(Error)
  })
})


describe('Field.stringify', () => {
  test('should be stringify the Payload Format Indicator', () => {
    expect(Field.stringify('00', '01')).toMatch('000201')
  })

  test('should be throw Error when pass a invalid id', () => {
    expect(() => Field.stringify('99', '00')).toThrow(Error)
  })
})
