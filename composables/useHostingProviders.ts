import type { Hosting } from '../types'
import type { Deploy } from '#build/content/content'

export const useHostingProviders = () => {
  const providers = useState<Deploy[]>('hostingProviders', () => [])

  async function fetchList() {
    if (providers.value.length) {
      return
    }

    try {
      // const data = await queryContentV3<Hosting>('/deploy')
      //   .where({ _extension: 'md' })
      //   .without(['body', 'excerpt'])
      //   .sort({ date: -1 })
      //   .find()
      const data = await queryCollection('deploy')
        .where('path', 'LIKE', '/deploy/%')
        .where('extension', '=', 'md')
        .order('date', 'DESC')
        .all()

      providers.value = data
    }
    catch (e) {
      providers.value = []
      return e
    }
  }

  return {
    providers,
    fetchList
  }
}
