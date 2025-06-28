import { Style, css } from 'hono/css'
import type { FC } from 'hono/jsx'
import { jsxRenderer } from 'hono/jsx-renderer'
import { Footer } from '../components/Footer'
import { Header } from '../components/Header'
import { baseURL, siteName, siteDescription, defaultOGImage } from '../lib/constants'

export default jsxRenderer(({ children, frontmatter, currentPath }) => {
  return (
    <html lang="ja">
      <Head frontmatter={frontmatter} currentPath={currentPath} />
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
})

const Head: FC = ({ frontmatter, currentPath }) => {
  const pageTitle = frontmatter?.title ? `${frontmatter.title} — ${siteName}` : siteName
  const pageDescription = frontmatter?.description || siteDescription
  const pageImage = frontmatter?.ogImage ? `${baseURL}${frontmatter.ogImage}` : `${baseURL}${defaultOGImage}`
  const pageUrl = currentPath ? `${baseURL}${currentPath}` : baseURL

  return (
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>{pageTitle}</title>
      <meta name="description" content={pageDescription} />
      <link rel="stylesheet" href="https://unpkg.com/ress/dist/ress.min.css" />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="" />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Saira:wght@400;500&display=swap"
      />
      <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.15.1/css/all.css" />
      <Style>{globalCss}</Style>
      <link rel="icon" href="/favicon.ico" />
      <link rel="sitemap" href="/sitemap.xml" />
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="article" />
      <meta property="og:url" content={pageUrl} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDescription} />
      <meta property="og:image" content={pageImage} />
      <meta property="og:site_name" content={siteName} />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:url" content={pageUrl} />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={pageDescription} />
      <meta name="twitter:image" content={pageImage} />
    </head>
  )
}

const globalCss = css`
  body {
    min-height: 100dvh;
    display: grid;
    grid-template-columns: 100%;
    grid-template-rows: auto 1fr auto;

    font-family: "-apple-system", "BlinkMacSystemFont", sans-serif;
    font-feature-settings: "palt";
    background-color: hsl(0 0% 98%);
    color: hsl(0 0% 20%);
  }

  main {
    padding: 30px 15px;
    display: flex;
    flex-direction: column;
    row-gap: 30px;
    background-color: hsl(0 0% 100%);

    * {
      width: 100%;
      max-width: 620px;
      margin-inline: auto;
    }
  }
  `
