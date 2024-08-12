import { Feed } from 'feed'
import { joinURL } from 'ufo'

export default defineEventHandler(async (event) => {
  const baseUrl = 'https://nuxt.com'
  const siteUrl = joinURL(baseUrl, 'blog')
  const feed = new Feed({
    title: 'The Nuxt Blog',
    description: 'News and updates about Nuxt.',
    id: siteUrl,
    link: siteUrl,
    language: 'en',
    image: joinURL(baseUrl, 'icon.png'),
    favicon: joinURL(baseUrl, 'favicon.png'),
    copyright: `Copyright © 2016-${new Date().getFullYear()} Nuxt All Rights Reserved`,
    feedLinks: {
      rss: `${siteUrl}/rss.xml`
    }
  })

  const articles = await $fetch('/api/content/query', {
    query: {
      q: `SELECT * FROM content WHERE _type = 'markdown' AND path LIKE '/blog%' AND _partial = false AND _draft = false`
    }
  })

  for (const article of articles) {
    feed.addItem({
      link: joinURL(baseUrl, article._path),
      image: joinURL(baseUrl, article.image),
      title: article.title,
      date: new Date(article.date),
      description: article.description,
      author: article.authors,
      category: article.category
    })
  }

  appendHeader(event, 'Content-Type', 'application/xml')
  return feed.rss2()
})
