export default eventHandler(async (event) => {
  // const templates = await $fetch('/api/content/query', {
  //   query: {
  //     q: `SELECT * FROM content WHERE path = '/templates' AND _partial = false AND _draft = false`
  //   }
  // }).then(res => res[0].body.templates)
  const templates = await queryContents('content').path('/templates').first().then(res => res.body.templates)

  return templates.map(template => ({
    slug: template.slug,
    name: template.name,
    description: template.description,
    screenshot: `https://nuxt.com/assets/templates/${template.slug}.png`,
    repo: template.repo,
    demo: template.demo,
    pricing: template.badge || 'Free'
  }))
})
