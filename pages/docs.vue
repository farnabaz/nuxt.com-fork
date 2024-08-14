<script setup lang="ts">
import type { ContentNavigationItem } from '@farnabaz/content-next'

const navigation = inject<Ref<ContentNavigationItem[]>>('navigation')

defineOgImageComponent('Docs')

const route = useRoute()
const { navPageFromPath } = useContentHelpers()
const { headerLinks } = useNavigation()

const links = computed(() => headerLinks.value.find(link => link.to === '/docs')?.children ?? [])

const navigationLinks = computed(() => {
  const path = ['/docs', route.params.slug?.[0]].filter(Boolean).join('/')

  return mapContentNavigation(navPageFromPath(path, navigation.value)?.children || [])
})
</script>

<template>
  <UContainer>
    <UPage>
      <template #left>
        <UAside :links="links">
          <UDivider type="dashed" class="mb-6" />
          <UNavigationTree :links="navigationLinks" default-open :multiple="false" />
        </UAside>
      </template>

      <NuxtPage />
    </UPage>
    <div class="hidden v2">
      {{ navigation }}
    </div>
    <div class="hidden v3">
      {{ navigationLinks }}
    </div>
  </UContainer>
</template>
