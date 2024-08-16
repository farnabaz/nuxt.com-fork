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
      const data = await queryCollection('blog')
        .where('extension', '=', 'md')
        .select('title', 'date', 'path', 'description', 'date', 'authors', 'image')
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
