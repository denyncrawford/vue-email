import type { VueEmailPLuginOptions } from 'vue-email'
import { templateRender } from '$src/compiler/node'
import { useRuntimeConfig, useStorage } from '#imports'

export async function useCompiler(filename: string, props: Record<string, unknown> = {}) {
  const vueEmailOptions = useRuntimeConfig().public.vueEmailOptions as VueEmailPLuginOptions

  const source = await useStorage('assets:emails').getItem(filename)

  const template = await templateRender(
    filename,
    source,
    {
      props,
    },
    {
      verbose: false,
      options: vueEmailOptions,
    },
  )

  return template
}
