import { ParsedPayload } from '../src/classes/ParsedPayload'
import { Payload } from '../src/lib/Payload'

const generatePayload = jest.fn(() =>
  Payload.generate({
    pixKey: 'pedroca21265@gmail.com',
    merchant: {
      name: 'Pedro Henrique Lemes Da S',
      city: 'Sao Paulo'
    }
  })
)

describe('Test `Payload.to...` functions', () => {
  test('the function `toArray` must be return a valid array with fields', () => {
    const payload = generatePayload()
    expect(typeof payload.toArray()).toBe('object')
    expect(Array.isArray(payload.toArray())).toBe(true)
  })
  test('the function `toIterator` must be return a valid iterator', () => {
    const payload = generatePayload()
    const [one, two] = payload.toArray()
    const iterator = payload.toIterator()

    const oneA = iterator.next()
    const twoA = iterator.next()

    expect(typeof iterator).toBe('object')
    expect(oneA.value).toBe(one)
    expect(twoA.value).toBe(two)
  })
  test('the function `toString` must be return a valid string', () => {
    const payload = generatePayload()
    expect(typeof payload.toString()).toBe('string')
  })
  test('the function `toObject` must be return a valid object', () => {
    const payload = generatePayload()
    const object = payload.toObject()
    expect(typeof object).toBe('object')
    expect(object['00'].body).toBe('01')
  })
})

describe('Test Payload getField', () => {
  test('must be return a object with data and value "01"', () => {
    const payload = generatePayload()
    const field = payload.getField('00')
    expect(field).toHaveProperty('data')
    expect(field.data).toBe('01')
  })

  test('must be throw a Error', () => {
    const payload = generatePayload()
    expect(() => payload.getField('99')).toThrowError()
    expect(() => payload.getField('54')).toThrowError()
  })
})

describe('Test Payload Symbol Function', () => {
  test('when use ...(spread) must be return a array', () => {
    const payload = generatePayload()
    expect([...payload]).toStrictEqual(payload.toArray())
  })
  test('must be return a stringTag', () => {
    expect(Object.prototype.toString.call(new ParsedPayload('', []))).toBe(
      '[object ParsedPayload]'
    )
  })
})

describe('Test Payload basic attributes', () => {
  test('must be return the pix key', () => {
    const payload = generatePayload()
    expect(payload.pixKey).toBe('pedroca21265@gmail.com')
  })
  test('must be return the merchant name', () => {
    const payload = generatePayload()
    expect(payload.merchantName).toBe('Pedro Henrique Lemes Da S')
  })
  test('must be return the merchant city', () => {
    const payload = generatePayload()
    expect(payload.merchantCity).toBe('SAO PAULO')
  })
  test('must be return the merchant code', () => {
    const payload = generatePayload()
    expect(payload.merchantCategoryCode).toBe('0000')
  })
  test('must be return the CRC16 code', () => {
    const payload = generatePayload()
    expect(typeof payload.CRC16).toBe('string')
    expect(payload.CRC16.length).toBe(4)
  })
  test('must be return the Payload Format Code', () => {
    const payload = generatePayload()
    expect(typeof payload.payloadFormat).toBe('string')
    expect(payload.payloadFormat.length).toBe(2)
    expect(payload.payloadFormat).toBe('01')
  })
  test('must be return the Transaction Amount', () => {
    const payload = generatePayload()
    expect(payload.transactionAmount).toBe(null)
  })
  test('must be return the Transaction Currency', () => {
    const payload = generatePayload()
    expect(payload.transactionCurrency).toBe('986')
  })
  test('must be return the Country Code', () => {
    const payload = generatePayload()
    expect(payload.country).toBe('BR')
  })

  test('must be return the merchant account', () => {
    const payload = generatePayload()
    expect(payload.merchantAccount).toHaveProperty('gui', 'br.gov.bcb.pix')
    expect(payload.merchantAccount).toHaveProperty(
      'key',
      'pedroca21265@gmail.com'
    )
    expect(payload.merchantAccount).toHaveProperty('description', undefined)
    expect(payload.merchantAccount).toHaveProperty('pss', undefined)
  })
  test('must be return a txID/identifier', () => {
    const payload = generatePayload()
    expect(payload.txID).toBe('***')
    expect(payload.identifier).toBe('***')
  })
  test('must be return the additional data', () => {
    const payload = generatePayload()
    expect(payload.additionalData).toHaveProperty('txID', '***')
  })
  test('must be throw a error', () => {
    const payload = generatePayload()
    expect(() => payload.description).toThrowError()
    expect(() => payload.pss).toThrowError()
  })
  test('must be return the Merchant Description', () => {
    const payload = Payload.generate({
      pixKey: 'pedroca21265@gmail.com',
      merchant: {
        name: 'Pedro Henrique Lemes da S',
        city: 'São Paulo',
        description: 'test'
      }
    })
    expect(payload.description).toBe('test')
  })
  test('must be return the Merchant PSS', () => {
    const payload = Payload.generate({
      pixKey: 'pedroca21265@gmail.com',
      merchant: {
        name: 'Pedro Henrique Lemes da S',
        city: 'São Paulo',
        pss: '0123'
      }
    })
    expect(payload.pss).toBe('0123')
  })
})
