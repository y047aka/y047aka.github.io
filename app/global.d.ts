import {} from 'hono'
import type { Meta } from './types'

declare module 'hono' {
  interface ContextRenderer {
    // biome-ignore lint/style/useShorthandFunctionType: <explanation>
    (
      content: string | Promise<string>,
      meta?: { frontmatter?: Meta; currentPath?: string }
    ): Response | Promise<Response>
  }
}
