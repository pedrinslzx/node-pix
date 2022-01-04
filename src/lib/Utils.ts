class Utils {
  public formatCity(city: string): string {
    return city
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toUpperCase()
  }

  getCRC16(payload: string) {
    const length = payload.length

    // DADOS DEFINIDOS PELO BACEN
    const polinomio = 0x01021
    let resultado = 0x0ffff

    // CHECKSUM
    if (length > 0) {
      for (let offset = 0; offset < length; offset++) {
        resultado ^= payload[offset].charCodeAt(0) << 8
        for (let bitwise = 0; bitwise < 8; bitwise++) {
          if ((resultado <<= 1) & 0x010000) resultado ^= polinomio
          resultado &= 0x0ffff
        }
      }
    } else {
      return 'FFFF'
    }

    // RETORNA CÓDIGO CRC16 DE 4 CARACTERES
    return resultado.toString(16).toUpperCase().padStart(4, '0')
  }
}

const utils = new Utils()

export { utils as Utils }
