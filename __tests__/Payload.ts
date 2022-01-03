import { Payload } from '../src/lib/Payload'

describe('Payload.generate', () => {
  test('should be return a QR code PIX payload', () => {
    const payload = Payload.generate({
      pixKey: 'pedroca21265@gmail.com',
      merchant: {
        name: 'Pedro Henrique Lemes Da S',
        city: 'Sao Paulo'
      }
    })
    expect(payload).toBe(
      '00020126440014br.gov.bcb.pix0122pedroca21265@gmail.com5204000053039865802BR5925Pedro Henrique Lemes Da S6009SAO PAULO62070503***63046520'
    )
  })
  test('should be return a QR code PIX payload with a another GUI', () => {
    const payload = Payload.generate({
      pixKey: 'pedroca21265@gmail.com',
      GUI: 'com.example.pix',
      merchant: {
        name: 'Pedro Henrique Lemes Da S',
        city: 'Sao Paulo'
      }
    })
    expect(payload).toBe(
      '00020126450015com.example.pix0122pedroca21265@gmail.com5204000053039865802BR5925Pedro Henrique Lemes Da S6009SAO PAULO62070503***6304159D'
    )
  })
  test('should be return a QR code PIX payload with a merchant description', () => {
    const payload = Payload.generate({
      pixKey: 'pedroca21265@gmail.com',
      merchant: {
        name: 'Pedro Henrique Lemes Da S',
        city: 'Sao Paulo',
        description: 'Description'
      }
    })
    expect(payload).toBe(
      // TODO: teste com a função generateCRC16
      '00020126590014br.gov.bcb.pix0122pedroca21265@gmail.com0211Description5204000053039865802BR5925Pedro Henrique Lemes Da S6009SAO PAULO62070503***630408FF'
    )
  })
  test('should be return a QR code PIX payload with a another txid', () => {
    const payload = Payload.generate({
      pixKey: 'pedroca21265@gmail.com',
      txid: '*',
      merchant: {
        name: 'Pedro Henrique Lemes Da S',
        city: 'Sao Paulo'
      }
    })
    expect(payload).toBe(
      '00020126440014br.gov.bcb.pix0122pedroca21265@gmail.com5204000053039865802BR5925Pedro Henrique Lemes Da S6009SAO PAULO62050501*630473E2'
    )
  })
  test('should be return a QR code PIX payload with a another txid using option `identifier`', () => {
    const payload = Payload.generate({
      pixKey: 'pedroca21265@gmail.com',
      identifier: '*',
      merchant: {
        name: 'Pedro Henrique Lemes Da S',
        city: 'Sao Paulo'
      }
    })
    expect(payload).toBe(
      '00020126440014br.gov.bcb.pix0122pedroca21265@gmail.com5204000053039865802BR5925Pedro Henrique Lemes Da S6009SAO PAULO62050501*630473E2'
    )
  })
  test('should be return a QR code PIX payload with a amount value of R$ 50,00', () => {
    const payload = Payload.generate({
      pixKey: 'pedroca21265@gmail.com',
      amount: 50.0,
      merchant: {
        name: 'Pedro Henrique Lemes Da S',
        city: 'Sao Paulo'
      }
    })
    expect(payload).toBe(
      '00020126440014br.gov.bcb.pix0122pedroca21265@gmail.com520400005303986540550.005802BR5925Pedro Henrique Lemes Da S6009SAO PAULO62070503***630436EE'
    )
  })
})
describe('Payload.parse', () => {
  test('should be return a object with properties array', () => {
    const payload = Payload.parse(
      '00020126440014br.gov.bcb.pix0122pedroca21265@gmail.com520400005303986540550.005802BR5925Pedro Henrique Lemes Da S6009Sao Paulo62070503***6304D3DC'
    )
    expect(payload).toHaveProperty('array')
  })

  test('should be return a array when called a function array returned by Payload.parse', () => {
    const payload = Payload.parse(
      '00020126440014br.gov.bcb.pix0122pedroca21265@gmail.com520400005303986540550.005802BR5925Pedro Henrique Lemes Da S6009Sao Paulo62070503***6304D3DC'
    )
    expect(Array.isArray(payload.array())).toBe(true)
  })
})
