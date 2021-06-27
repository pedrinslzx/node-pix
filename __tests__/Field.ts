import { Field } from '../src/lib/Field'

test('should be parse the Payload Format Indicator', () => {
  const fieldInString = '000201'
  const fieldParsed = Field.parse(fieldInString)
  expect(fieldParsed).toMatchObject({ id: '00', size: 2, data: '01' })
})


test('should be stringify the Payload Format Indicator', () => {
  const field = { id: '00', data: '01' }
  const fieldParsed = Field.stringify(field.id, field.data)
  expect(fieldParsed).toMatch('000201')
})
