import ssg from '@hono/vite-ssg'
import mdx from '@mdx-js/rollup'
import honox from 'honox/vite'
import { devServerDefaultOptions } from 'honox/vite'
import remarkFrontmatter from 'remark-frontmatter'
import remarkGfm from 'remark-gfm'
import remarkMdxFrontmatter from 'remark-mdx-frontmatter'
import { defineConfig } from 'vite'

const entry = './app/server.ts'

export default defineConfig(() => {
  return {
    plugins: [
      honox({
        devServer: {
          exclude: [
            ...devServerDefaultOptions.exclude,
            /^\/app\/.+/,
            /^\/favicon.ico$/,
            /\.(png|jpg|jpeg|gif|svg|webp|ico|css|js|ts|json)$/,
          ],
        },
      }),
      ssg({ entry }),
      mdx({
        jsxImportSource: 'hono/jsx',
        remarkPlugins: [remarkFrontmatter, remarkMdxFrontmatter, remarkGfm]
      })
    ]
  }
})
