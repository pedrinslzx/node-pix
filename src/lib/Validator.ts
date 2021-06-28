import { Payload } from "../lib/Payload"
import { ValidatorTypeError, ValidatorError } from "../utils/Errors"
import { Utils } from "./Utils"

class Validator {
  public validateName(name: string): string {
    if (typeof name !== 'string') throw new ValidatorTypeError('name must be a valid string')
    if (name.length > 25) throw new ValidatorError('Name must be less than 25 characters')

    return name
  }
  public validatePayload(payload: string): string {
    if (typeof payload !== 'string') throw new ValidatorTypeError('payload must be a valid string')
    const parsed = Payload.parse(payload).array()
    const crc16 = parsed[parsed.length - 1].data as string
    const calcCRC16 = Utils.getCRC16(payload.substring(0, payload.length - 4))
    if (crc16 !== calcCRC16) throw new ValidatorError('this payload is invalid')
    return payload.split('\n').join('')
  }
  public validateReferenceLabel(label: string): string {
    if (typeof label !== 'string') throw new ValidatorTypeError('label must be a valid string')
    if (label.length > 25) throw new ValidatorError('Reference label must be less or equal than 25 characters')

    return label
  }
  public validateCity(city: string): string {
    if (typeof city !== 'string') throw new ValidatorTypeError('city must be a valid string')
    if (city.length > 15) throw new ValidatorError('City must be less or equal than 15 characters')
    return Utils.formatCity(city)
  }
}

const validator = new Validator()

export { validator as Validator }
