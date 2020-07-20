import '@/styles/index.css'
import GlobalContext from '@/components/context/GlobalContext'
import Layout from '@/components/Layout'

function MyApp({ Component, pageProps }) {
  return (
    <GlobalContext.Provider value={{}}>
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
  return { pageProps }
}

export default MyApp
