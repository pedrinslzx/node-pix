import { Validator } from '../src/lib/Validator'

test('should be throw TypeError when pass a undefined in arguments', () => {
  expect(() => Validator.validateName(undefined as unknown as string)).toThrow(
    TypeError
  )
  expect(() => Validator.validateCity(undefined as unknown as string)).toThrow(
    TypeError
  )
  expect(() =>
    Validator.validateReferenceLabel(undefined as unknown as string)
  ).toThrow(TypeError)
  expect(() =>
    Validator.validatePayload(undefined as unknown as string)
  ).toThrow(TypeError)
})

test('should be throw Error when pass a invalid string with more caracteres ', () => {
  expect(
    Validator.validateName('1234567890123456789012345678901234567890')
  ).toBe('1234567890123456789012345')
  expect(
    Validator.validateCity('1234567890123456789012345678901234567890')
  ).toBe('123456789012345')
  expect(
    Validator.validateReferenceLabel('1234567890123456789012345678901234567890')
  ).toBe('1234567890123456789012345')
})

test('should be return the formatted value when pass a valid string ', () => {
  expect(Validator.validateName('Fulano de Tal')).toBe('Fulano de Tal')
  expect(Validator.validateCity('São Paulo')).toBe('SAO PAULO')
  expect(Validator.validateReferenceLabel('***')).toBe('***')
})

test('should be throw error when pass a invalid payload', () => {
  expect(() => Validator.validatePayload('0002016304AAE0')).toThrow(Error)
})
test('should be return valid payload when pass a valid string', () => {
  expect(Validator.validatePayload('0002016304AAE6')).toBe('0002016304AAE6')
})
