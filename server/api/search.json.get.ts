export default eventHandler(async (event) => {
  // const docs = await $fetch('/api/content/query', {
  //   query: {
  //     q: `SELECT * FROM content WHERE _type = 'markdown' AND path LIKE '/docs%'`
  //   }
  // })
  const docs = await queryCollection('content')
    .where('extension', '=', 'md')
    .where('path', 'LIKE', '/docs%')
    .all()
  return docs
  // return await queryContentV3('/docs').where({
  //   _type: 'markdown',
  //   _path: {
  //     $and: [{
  //       $ne: new RegExp('^/docs/bridge')
  //     }, {
  //       $ne: new RegExp('^/docs/migration')
  //     }]
  //   },
  //   navigation: { $ne: false }
  // }).find()
})
