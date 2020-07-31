import Head from 'next/head'

import Navigation from './Navigation'
import Footer from './Footer'

const Layout = ({ children, title = '/' }) => {
  const parsedTitle =
    title !== '/'
      ? `${title} | Road To Success`
      : 'Road To Success Official Website'

  return (
    <>
      <Head>
        <title>{parsedTitle}</title>
        <meta name="description" content="Road to success motorsport" />
        <meta name="robots" content="index,follow" />
        <meta name="googlebot" content="index,follow" />
        <meta name="Classification" content="Business" />
        <meta name="author" content="Luigi, luigi.prodesign@gmail.com" />
        <meta name="designer" content="Luigi Derson" />
        <meta name="copyright" content="Road To Success" />
      </Head>
      <Navigation />
      <main>{children}</main>
      <Footer />
    </>
  )
}

export default Layout
