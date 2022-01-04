import { Payload } from '../lib/Payload'
import { ValidatorTypeError, ValidatorError } from '../utils/Errors'
import { DetailedField } from '../utils/GetFieldsConfig'
import { IDS } from './constants'
import { Utils } from './Utils'

class Validator {
  public validateName(name: string): string {
    if (typeof name !== 'string') {
      throw new ValidatorTypeError('name must be a valid string')
    }
    name = name.slice(0, 25)

    return name
  }

  public validatePayload(payload: string): string {
    if (typeof payload !== 'string') {
      throw new ValidatorTypeError('payload must be a valid string')
    }
    const parsedPayload = Payload.parse(payload)
    const parsedArray = parsedPayload.toArray()

    const crc16 = parsedArray.find(
      ({ id }) => id === IDS.ID_CRC16
    ) as DetailedField
    const crc16data = crc16.data as string

    const calcCRC16 = Utils.getCRC16(payload.replace(crc16data, ''))

    if (crc16.data !== calcCRC16) {
      throw new ValidatorError('this payload is invalid')
    }

    return payload.split('\n').join('')
  }

  public validateReferenceLabel(label: string): string {
    if (typeof label !== 'string') {
      throw new ValidatorTypeError('label must be a valid string')
    }
    label = label.slice(0, 25)

    return label
  }

  public validateCity(city: string): string {
    if (typeof city !== 'string') {
      throw new ValidatorTypeError('city must be a valid string')
    }
    city = city.slice(0, 15)
    return Utils.formatCity(city)
  }
}

const validator = new Validator()

export { validator as Validator }
