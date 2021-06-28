import { Payload } from '../src/lib/Payload'

describe('Payload.generate', () => {
  test('should be return a QR code PIX payload', () => {
    const payload = Payload.generate({
      pixKey: '123e4567-e12b-12d1-a456-426655440000',
      merchant: {
        name: 'Fulano de Tal',
        city: 'BRASILIA'
      }
    })
    expect(payload).toBe(
      '00020126580014br.gov.bcb.pix0136123e4567-e12b-12d1-a456-4266554400005204000053039865802BR5913Fulano de Tal6008BRASILIA62070503***63041D3D'
    )
  })
  test('should be return a QR code PIX payload with a another GUI', () => {
    const payload = Payload.generate({
      pixKey: '123e4567-e12b-12d1-a456-426655440000',
      GUI: 'com.example.pix',
      merchant: {
        name: 'Fulano de Tal',
        city: 'BRASILIA'
      }
    })
    expect(payload).toBe(
      '00020126590015com.example.pix0136123e4567-e12b-12d1-a456-4266554400005204000053039865802BR5913Fulano de Tal6008BRASILIA62070503***6304CDC7'
    )
  })
  test('should be return a QR code PIX payload with a merchant description', () => {
    const payload = Payload.generate({
      pixKey: '123e4567-e12b-12d1-a456-426655440000',
      merchant: {
        name: 'Fulano de Tal',
        city: 'BRASILIA',
        description: 'Description'
      }
    })
    expect(payload).toBe(
      '00020126730014br.gov.bcb.pix0136123e4567-e12b-12d1-a456-4266554400000211Description5204000053039865802BR5913Fulano de Tal6008BRASILIA62070503***63043428'
    )
  })
  test('should be return a QR code PIX payload with a another txid', () => {
    const payload = Payload.generate({
      pixKey: '123e4567-e12b-12d1-a456-426655440000',
      txid: '*',
      merchant: {
        name: 'Fulano de Tal',
        city: 'BRASILIA'
      }
    })
    expect(payload).toBe(
      '00020126580014br.gov.bcb.pix0136123e4567-e12b-12d1-a456-4266554400005204000053039865802BR5913Fulano de Tal6008BRASILIA62050501*630429AF'
    )
  })
})
describe('Payload.parse', () => {
  test('should be return a object with properties array', () => {
    const payload = Payload.parse('00020126580014br.gov.bcb.pix0136123e4567-e12b-12d1-a456-4266554400005204000053039865802BR5913Fulano de Tal6008BRASILIA62070503***63041D3D')
    expect(payload).toHaveProperty('array')
  })

  test('should be return a array when called a function array returned by Payload.parse', () => {
    const payload = Payload.parse('00020126580014br.gov.bcb.pix0136123e4567-e12b-12d1-a456-4266554400005204000053039865802BR5913Fulano de Tal6008BRASILIA62070503***63041D3D')
    expect(Array.isArray(payload.array())).toBe(true)
  })
})
