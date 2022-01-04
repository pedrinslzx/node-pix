import { IDS } from '../lib/constants'
import { ParsedField } from '../lib/Field'
import { GetFieldsConfig, DetailedField } from '../utils/GetFieldsConfig'
import { generateIterator } from '../utils/Iterator'

export class ParsedPayload {
  public readonly raw: string
  private fields: DetailedField[]

  constructor(payload: string, fields: ParsedField[]) {
    this.raw = payload
    this.fields = GetFieldsConfig(fields)
  }

  public toIterator() {
    return generateIterator(this.fields)
  }

  get [Symbol.toStringTag]() {
    return 'ParsedPayload'
  }

  public [Symbol.iterator]() {
    return this.toIterator()
  }

  public toArray() {
    return this.fields
  }

  public toObject() {
    const fields: Record<typeof IDS[keyof typeof IDS], DetailedField> = {}

    for (const field of this.fields) {
      fields[field.id] = field
    }

    return fields
  }

  public toString() {
    return this.raw
  }

  public getField(id: typeof IDS[keyof typeof IDS]) {
    if (!Object.values(IDS).includes(id)) {
      throw new Error(`ParsedPayload: field ${id} not found`)
    }
    const field = this.fields.find(field => field.id === id)

    if (!field) {
      throw new Error(`ParsedPayload: field ${id} not found`)
    }

    return field
  }

  private getWithoutError<K extends keyof ParsedPayload>(
    name: K
  ): ParsedPayload[K] | undefined {
    try {
      return this[name]
    } catch {
      return undefined
    }
  }

  private get merchantAccountField() {
    const merchantAccount = this.getField(IDS.ID_MERCHANT_ACCOUNT_INFORMATION)
    return merchantAccount.body as DetailedField[]
  }

  private get additionalDataField() {
    const additionalData = this.getField(IDS.ID_ADDITIONAL_DATA_FIELD_TEMPLATE)
    return additionalData.body as DetailedField[]
  }

  get merchantAccount() {
    return {
      gui: this.getWithoutError('gui'),
      key: this.getWithoutError('pixKey'),
      description: this.getWithoutError('description'),
      pss: this.getWithoutError('pss')
    }
  }

  get additionalData() {
    return {
      txID: this.getWithoutError('txID')
    }
  }

  get pixKey() {
    const pixKeyField = this.merchantAccountField.find(
      field => field.id === IDS.ID_MERCHANT_ACCOUNT_INFORMATION_KEY
    ) as DetailedField

    return pixKeyField.data as string
  }

  get txID() {
    const txIDField = this.additionalDataField.find(
      field => field.id === IDS.ID_ADDITIONAL_DATA_FIELD_TEMPLATE_TXID
    ) as DetailedField

    return txIDField.data as string
  }

  get identifier() {
    return this.txID
  }

  get country() {
    return this.getField(IDS.ID_COUNTRY_CODE).data as string
  }

  get CRC16() {
    return this.getField(IDS.ID_CRC16).data as string
  }

  get merchantCategoryCode() {
    return this.getField(IDS.ID_MERCHANT_CATEGORY_CODE).data as string
  }

  get merchantCity() {
    return this.getField(IDS.ID_MERCHANT_CITY).data as string
  }

  get merchantName() {
    return this.getField(IDS.ID_MERCHANT_NAME).data as string
  }

  get payloadFormat() {
    return this.getField(IDS.ID_PAYLOAD_FORMAT_INDICATOR).data as string
  }

  get transactionAmount() {
    try {
      return this.getField(IDS.ID_TRANSACTION_AMOUNT)
    } catch (error) {
      return null
    }
  }

  get transactionCurrency() {
    return this.getField(IDS.ID_TRANSACTION_CURRENCY).data as string
  }

  get gui() {
    const field = this.merchantAccountField.find(
      field => field.id === IDS.ID_MERCHANT_ACCOUNT_INFORMATION_GUI
    ) as DetailedField

    return field.data as string
  }

  get description() {
    const field = this.merchantAccountField.find(
      field => field.id === IDS.ID_MERCHANT_ACCOUNT_INFORMATION_DESCRIPTION
    )
    if (!field) {
      throw new Error('ParsedPayload: description not found')
    }

    return field.data as string
  }

  get pss() {
    const field = this.merchantAccountField.find(
      field => field.id === IDS.ID_MERCHANT_ACCOUNT_INFORMATION_PSS
    )
    if (!field) {
      throw new Error('ParsedPayload: pss not found')
    }

    return field.data as string
  }
}
