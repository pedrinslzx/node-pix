export const IDS = Object.freeze({
  ID_PAYLOAD_FORMAT_INDICATOR: '00',

  ID_MERCHANT_ACCOUNT_INFORMATION: '26',
  ID_MERCHANT_ACCOUNT_INFORMATION_GUI: '00',
  ID_MERCHANT_ACCOUNT_INFORMATION_KEY: '01',
  ID_MERCHANT_ACCOUNT_INFORMATION_DESCRIPTION: '02',
  ID_MERCHANT_ACCOUNT_INFORMATION_PSS: '03',

  ID_MERCHANT_CATEGORY_CODE: '52',

  ID_TRANSACTION_CURRENCY: '53',
  ID_TRANSACTION_AMOUNT: '54',

  ID_COUNTRY_CODE: '58',

  ID_MERCHANT_NAME: '59',
  ID_MERCHANT_CITY: '60',

  ID_ADDITIONAL_DATA_FIELD_TEMPLATE: '62',
  ID_ADDITIONAL_DATA_FIELD_TEMPLATE_TXID: '05',

  ID_CRC16: '63'
})

export const DEFAULT_MERCHANT_GUI = 'br.gov.bcb.pix'
export const DEFAULT_TXID = '***'

interface BaseFieldConfig<T extends boolean> {
  id: string

  name: string
  description?: string

  optional: boolean

  minLength?: number | 99
  maxLength?: number | 99

  hasBody?: T
  body?: BaseFieldConfig<false>[]

  hardValue?: string
}

export type FieldConfig =
  | (BaseFieldConfig<true> & {
      body: BaseFieldConfig<false>[]
    })
  | BaseFieldConfig<false>

export const FIELD_CONFIG = Object.freeze<FieldConfig>([
  {
    id: '26',
    optional: false,
    name: 'MERCHANT_ACCOUNT_INFORMATION',
    description: 'Merchant Account Information',
    maxLength: 99,
    hasBody: true,
    body: [
      {
        id: '00',
        optional: false,
        name: 'MERCHANT_ACCOUNT_INFORMATION_GUI',
        hardValue: DEFAULT_MERCHANT_GUI,
        description: 'br.gov.bcb.pix'
      },
      {
        id: '01',
        optional: false,
        maxLength: 77,
        name: 'MERCHANT_ACCOUNT_INFORMATION_KEY',
        description: 'Chave Pix'
      },
      {
        id: '02',
        optional: true,
        maxLength: 72,
        name: 'MERCHANT_ACCOUNT_INFORMATION_DESCRIPTION',
        description: 'Conjunto livre de caracteres com limite de tamanho'
      },
      {
        id: '03',
        optional: true,
        maxLength: 8,
        minLength: 8,
        name: 'MERCHANT_ACCOUNT_INFORMATION_PSS',
        description: 'ISPB do facilitador de serviço de saque (NR)'
      }
    ]
  },
  {
    id: '62',
    optional: false,
    name: 'ADDITIONAL_DATA_FIELD_TEMPLATE',
    description: 'Additional Data Field Template',
    hasBody: true,
    body: [
      {
        id: '05',
        optional: false,
        name: 'ADDITIONAL_DATA_FIELD_TEMPLATE_TXID',
        maxLength: 25
      }
    ]
  },
  {
    id: '00',
    optional: false,
    name: 'PAYLOAD_FORMAT_INDICATOR',
    hardValue: '01'
  },
  {
    id: '52',
    optional: false,
    name: 'MERCHANT_CATEGORY_CODE'
  },
  {
    id: '53',
    optional: false,
    name: 'TRANSACTION_CURRENCY',
    hardValue: '986'
  },
  {
    id: '54',
    optional: true,
    name: 'TRANSACTION_AMOUNT'
  },
  {
    id: '58',
    optional: false,
    name: 'COUNTRY_CODE'
  },
  {
    id: '59',
    optional: false,
    name: 'MERCHANT_NAME'
  },
  {
    id: '60',
    optional: false,
    name: 'MERCHANT_CITY'
  },
  {
    id: '63',
    optional: false,
    name: 'CRC16'
  }
])
