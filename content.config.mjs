import { defineCollection, contentSchema } from '@farnabaz/content-next'

export const collections = {
  docs: defineCollection({
    type: 'page',
    source: {
      name: 'docs',
      driver: 'github',
      repo: 'nuxt/nuxt',
      branch: '3.x',
      dir: 'docs',
      prefix: '/1.docs',
      token: process.env.NUXT_GITHUB_TOKEN || ''
    },
    schema: contentSchema
  })
}
