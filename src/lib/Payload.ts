import { ParsedPayload } from '../classes/ParsedPayload'
import { DEFAULT_MERCHANT_GUI, DEFAULT_TXID, IDS } from './constants'
import { Field } from './Field'
import { Utils } from './Utils'

export interface GeneratePayloadOptions {
  pixKey: string
  GUI?: string
  countryCode?: 'BR' | string
  transactionCurrency?: '986' | string
  txid?: '***' | string
  amount?: number
  merchant: {
    name: string
    city: string
    categoryCode?: '0000' | string
    description?: string
    pss?: string
  }
}

class Payload {
  private generateMerchantAccountInformation({
    GUI = DEFAULT_MERCHANT_GUI,
    key,
    description,
    pss
  }: {
    GUI?: string
    key: string
    description?: string
    pss?: string
  }): string {
    const MERCHANT_ACCOUNT_GUI = Field.stringify(
      IDS.ID_MERCHANT_ACCOUNT_INFORMATION_GUI,
      GUI
    )
    const MERCHANT_ACCOUNT_KEY = Field.stringify(
      IDS.ID_MERCHANT_ACCOUNT_INFORMATION_KEY,
      key
    )
    const MERCHANT_ACCOUNT_DESCRIPTION = description
      ? Field.stringify(
        IDS.ID_MERCHANT_ACCOUNT_INFORMATION_DESCRIPTION,
        description
      )
      : ''
    const MERCHANT_ACCOUNT_PSS = pss
      ? Field.stringify(IDS.ID_MERCHANT_ACCOUNT_INFORMATION_PSS, pss)
      : ''

    return Field.stringify(
      IDS.ID_MERCHANT_ACCOUNT_INFORMATION,
      MERCHANT_ACCOUNT_GUI +
        MERCHANT_ACCOUNT_KEY +
        MERCHANT_ACCOUNT_DESCRIPTION +
        MERCHANT_ACCOUNT_PSS
    )
  }

  private generateAdditionalFieldInformation({
    txid = DEFAULT_TXID
  }: {
    txid?: string
  }): string {
    const FIELD_TXID = Field.stringify(
      IDS.ID_ADDITIONAL_DATA_FIELD_TEMPLATE_TXID,
      txid
    )

    return Field.stringify(IDS.ID_ADDITIONAL_DATA_FIELD_TEMPLATE, FIELD_TXID)
  }

  private generateCRC16(currentPayload: string): string {
    const payload = `${currentPayload}${IDS.ID_CRC16}04`
    const CRC16 = Utils.getCRC16(payload)
    return Field.stringify(IDS.ID_CRC16, CRC16)
  }

  public generate(options: GeneratePayloadOptions): ParsedPayload {
    const payload = ['']

    const PAYLOAD_FORMAT_INDICATOR = Field.stringify(
      IDS.ID_PAYLOAD_FORMAT_INDICATOR,
      '01'
    )
    payload.push(PAYLOAD_FORMAT_INDICATOR)

    const MERCHANT_ACCOUNT = this.generateMerchantAccountInformation({
      key: options.pixKey,
      GUI: options.GUI,
      description: options.merchant.description,
      pss: options.merchant.pss
    })
    payload.push(MERCHANT_ACCOUNT)

    const CATEGORY_CODE = Field.stringify(
      IDS.ID_MERCHANT_CATEGORY_CODE,
      options.merchant.categoryCode || '0000'
    )
    payload.push(CATEGORY_CODE)

    const TRANSACTION_CURRENCY = Field.stringify(
      IDS.ID_TRANSACTION_CURRENCY,
      options.transactionCurrency || '986'
    )
    payload.push(TRANSACTION_CURRENCY)

    if (options.amount) {
      const stringPixAmount = options.amount.toFixed(2)
      const TRANSACTION_AMOUNT = Field.stringify(
        IDS.ID_TRANSACTION_AMOUNT,
        stringPixAmount
      )
      payload.push(TRANSACTION_AMOUNT)
    }

    const COUNTRY_CODE = Field.stringify(
      IDS.ID_COUNTRY_CODE,
      options.countryCode || 'BR'
    )
    payload.push(COUNTRY_CODE)

    const MERCHANT_NAME = Field.stringify(
      IDS.ID_MERCHANT_NAME,
      options.merchant.name
    )
    payload.push(MERCHANT_NAME)

    const MERCHANT_CITY = Field.stringify(
      IDS.ID_MERCHANT_CITY,
      Utils.formatCity(options.merchant.city)
    )
    payload.push(MERCHANT_CITY)

    const ADDITIONAL_FIELD_INFORMATION =
      this.generateAdditionalFieldInformation({
        txid: options.txid
      })
    payload.push(ADDITIONAL_FIELD_INFORMATION)

    const CRC16 = this.generateCRC16(payload.join(''))
    payload.push(CRC16)

    const parsedPayload = this.parse(payload.join(''))

    return parsedPayload
  }

  public parse(payload: string): ParsedPayload {
    const fields = Field.parse(payload)

    return new ParsedPayload(payload, fields)
  }
}

const payload = new Payload()

export { payload as Payload }
