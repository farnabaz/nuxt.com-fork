// import type { BlogArticle } from '../types'
import type { Blog } from '#build/content/content'

export const useBlog = () => {
  const articles = useState<Blog[]>('articles', () => [])
  // const featuredArticle: Ref<BlogArticle | {}> = useState('featured-article', () => ({}))

  // Data fetching

  async function fetchList() {
    if (articles.value.length) {
      return
    }

    try {
      // const data = await queryContentV3('/blog')
      //   .where({ _extension: 'md' })
      //   .without(['body', 'excerpt'])
      //   .sort({ date: -1 })
      //   .find()
      const data = await queryContents('blog')
        .where('path', 'LIKE', '/blog/%')
        .where('extension', '=', 'md')
        .order('date', 'DESC')
        .all()

      articles.value = data
      // featuredArticle.value = articles.value?.shift() || {}
    }
    catch (e) {
      articles.value = []
      return e
    }
  }

  return {
    articles,
    // featuredArticle,
    fetchList
  }
}
