import '@/styles/index.css'
import 'aos/dist/aos.css'
import GlobalContext from '@/components/context/GlobalContext'
import Layout from '@/components/Layout'
import { getLayoutContent } from '@/lib/api'

function MyApp({ Component, pageProps, layoutData }) {
  return (
    <GlobalContext.Provider value={layoutData}>
      <Layout>
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
