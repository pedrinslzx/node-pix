import { FIELD_CONFIG } from '../lib/constants'
import { ParsedField } from '../lib/Field'

export interface DetailedField<HasBody extends boolean = boolean> {
  id: string
  name: string
  description?: string

  size: number
  hasBody: HasBody
  body: string | DetailedField<false>[]

  data: string | ParsedField[]
}

export function GetFieldsConfig(
  fields: ParsedField[],
  searchIn = FIELD_CONFIG
): DetailedField[] {
  return fields.map(field => {
    const fieldConfig = searchIn.find(
      fieldConfig => fieldConfig.id === field.id
    )
    if (!fieldConfig) {
      throw new Error(`Field ${field.id} not found`)
    }

    const body: DetailedField['body'] =
      typeof field.data === 'string'
        ? field.data
        : (GetFieldsConfig(
            field.data,
            fieldConfig.body
          ) as DetailedField<false>[])

    return {
      id: fieldConfig.id,
      name: fieldConfig.name,
      description: fieldConfig.description,
      size: field.size,
      hasBody: fieldConfig.hasBody,
      body: body,
      data: field.data
    } as DetailedField
  })
}
