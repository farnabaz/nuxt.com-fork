import { z } from 'zod'
import { defineCollection, contentSchema } from '@farnabaz/content-next'

export const collections = [
  defineCollection('docs', {
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
  }),
  defineCollection('blog', {
    type: 'page',
    source: {
      name: 'blog',
      driver: 'fs',
      base: 'content/7.blog',
      prefix: '/7.blog'
    },
    schema: z.object({
      description: z.string(),
      date: z.date(),
      image: z.string(),
      authors: z.array(z.object({
        name: z.string(),
        avatarUrl: z.string(),
        link: z.string(),
        twitter: z.string()
      })),
      tags: z.array(z.string()),
      category: z.string()
    })
  }),
  defineCollection('deploy', {
    type: 'page',
    source: {
      name: 'deploy',
      driver: 'fs',
      base: 'content/3.deploy',
      prefix: '/3.deploy'
    },
    schema: z.object({
      title: z.string(),
      description: z.string(),
      componentImg: z.string(),
      logoImg: z.string(),
      logoSrc: z.string(),
      logoIcon: z.string(),
      category: z.string(),
      featured: z.boolean(),
      date: z.date()
    })
  })
]
