import { Utils } from '../src/lib/Utils'

test('should be return a formatted city', () => {
  const city = Utils.formatCity('São Paulo')
  expect(city).toBe('SAO PAULO')
})
test('should be return a crc16 for a string', () => {
  const crc16 = Utils.getCRC16('Lorem ipsum dolor sit amet, consectetur efficitur.')
  expect(crc16).toBe('B950')
})
test('should be return FFFF for a empty string', () => {
  const crc16 = Utils.getCRC16('')
  expect(crc16).toBe('FFFF')
})
