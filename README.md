# Welcome to Pix Payload 👋

![Version](https://img.shields.io/badge/version-0.0.2-blue.svg?cacheSeconds=2592000)
[![Documentation](https://img.shields.io/badge/documentation-yes-brightgreen.svg)](https://github.com/pedrinholemes/pix-br/wiki)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://github.com/pedrinholemes/pix-br/blob/main/LICENSE)
[![Twitter: pedrinho_lemes](https://img.shields.io/twitter/follow/pedrinho_lemes.svg?style=social)](https://twitter.com/pedrinho_lemes)

> Generate and parse the pix payload for QRCodes

<!-- ### 🏠 [Homepage](https://github.com/pedrinholemes/pix-br/) -->

## Install

```sh
yarn add pix-payload
```

## Usage

```js
const Payload = require('pix-payload')
/* or with ES Modules */
import Payload from 'pix-payload'
/* or using named export */
import { Payload } from 'pix-payload'

const payload = Payload.generate({
  pixKey: '123e4567-e12b-12d1-a456-426655440000',
  merchant: {
    name: 'Fulano de Tal',
    city: 'BRASILIA'
  }
})

console.log(payload) // 00020126580014br.gov.bcb.pix0136123e4567-e12b-12d1-a456-4266554400005204000053039865802BR5913Fulano de Tal6008BRASILIA62070503***63041D3D
```

## Run tests

```sh
yarn run test
```

## Author

👤 **Pedrinho Lemes <pedroca21265@gmail.com>**

- Website: <https://pedrinholemes.vercel.app>
- Twitter: [@pedrinho_lemes](https://twitter.com/pedrinho_lemes)
- Github: [@pedrinholemes](https://github.com/pedrinholemes)

## 🤝 Contributing

Contributions, issues and feature requests are welcome!

Feel free to check [issues page](https://github.com/pedrinholemes/pix-br/issues).

## Show your support

Give a ⭐️ if this project helped you!

## 📝 License

Copyright © 2021 [Pedrinho Lemes <pedroca21265@gmail.com>](https://github.com/pedrinholemes).

This project is [MIT](https://github.com/pedrinholemes/pix-br/blob/main/LICENSE) licensed.

---

_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_
