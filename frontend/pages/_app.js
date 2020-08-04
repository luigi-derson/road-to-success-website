import '@/styles/index.css'
import 'aos/dist/aos.css'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import GlobalContext from '@/components/context/GlobalContext'
import Layout from '@/components/Layout'
import { getLayoutContent } from '@/lib/api'
import { useRouter } from 'next/router'

function MyApp({ Component, pageProps, layoutData }) {
  const { pathname } = useRouter()

  const page =
    layoutData.navigation.pages.find(({ slug }) => pathname.includes(slug)) ||
    '/'

  return (
    <GlobalContext.Provider value={layoutData}>
      <Layout title={page.name}>
        <Component {...pageProps} />
      </Layout>
    </GlobalContext.Provider>
  )
}

MyApp.getInitialProps = async ({ Component, ctx }) => {
  let pageProps
  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx)
  }
  const layoutData = await getLayoutContent()
  return { pageProps, layoutData }
}

export default MyApp
