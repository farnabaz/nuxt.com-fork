// TODO: Update later
import { SitemapStream, streamToPromise } from 'sitemap'
import type { H3Event } from 'h3'

export default defineEventHandler(async (event: H3Event) => {
  const docs = await queryCollection('docs').all()

  const sitemap = new SitemapStream({
    hostname: 'https://nuxt.com'
  })
  for (const doc of docs) {
    sitemap.write({
      url: doc.path?.replace(/\/_dir$/, ''),
      changefreq: 'weekly'
    })
  }
  sitemap.end()
  return streamToPromise(sitemap)
})
