import { GetFieldsConfig } from '../src/utils/GetFieldsConfig'

test('must be throw a error', () => {
  expect(() =>
    GetFieldsConfig([{ id: '99', data: '99', size: 2 }])
  ).toThrowError()
})
