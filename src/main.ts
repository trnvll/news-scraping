import { hey } from '@src/helper'

if (!process.env.IS_TS_NODE) {
  require('module-alias/register')
}

console.log(hey)
