import { Crawler } from "./crawler"
import { GPT } from "./gpt"

if (!process.env.IS_TS_NODE) {
  require('module-alias/register')
}

const run = async () => {
  const model = await GPT.init()
  const crawler = await Crawler.init('https://www.bloomberg.com/markets')

  const html = await crawler.getHtml()
  const response = await model.getResponse(html)

  console.log(JSON.stringify(response, null, 2))

  await crawler.close()
}

run()