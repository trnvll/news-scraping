import { Crawler } from "./crawler"

if (!process.env.IS_TS_NODE) {
  require('module-alias/register')
}

const run = async () => {
  const crawler = await Crawler.init('https://www.bloomberg.com/markets')
  const html = await crawler.getHtml()
  console.log(html)

  await crawler.close()
}

run()