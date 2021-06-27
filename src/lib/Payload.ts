interface ParsedPayload { }
interface GeneratePayloadOptions { }

class Payload {
  public generate(options: GeneratePayloadOptions): string {
    return ''
  }
  public parse(payload: string): ParsedPayload {
    return {}
  }
}

const payload = new Payload()

export { payload as Payload }
