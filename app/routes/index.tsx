import { css } from 'hono/css'
import { createRoute } from 'honox/factory'
import { LinkTile } from '../components/LinkTile'
import { TopSection } from '../components/TopSection'
import type { MDX } from '../lib/post'

export default createRoute((c) => {
  const posts = import.meta.glob<MDX>('../posts/*.md', {
    eager: true
  })

  // 記事を投稿日の新しい順でソート
  const sortedPosts = Object.entries(posts)
    .filter(([, module]) => module.frontmatter)
    .sort(([, a], [, b]) => {
      const dateA = new Date(a.frontmatter!.pubDate)
      const dateB = new Date(b.frontmatter!.pubDate)
      return dateB.getTime() - dateA.getTime() // 新しい順（降順）
    })

  return c.render(
    <TopSection title="Blog Posts">
      <div class={css`display: flex; flex-direction: column; row-gap: 5px;`}>
        {sortedPosts.map(([id, module]) => {
          return (
            <LinkTile
              title={module.frontmatter!.title}
              subTitle={module.frontmatter!.pubDate}
              url={`${id.replace(/\.md$/, '')}`}
            />
          )
        })}
      </div>
    </TopSection>
  )
})
