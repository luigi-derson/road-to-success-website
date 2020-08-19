import { useEffect } from 'react'
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'

import '@/styles/index.css'
import 'aos/dist/aos.css'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import GlobalContext from '@/components/context/GlobalContext'
import Layout from '@/components/Layout'
import { getLayoutContent, getMaintenanceStatus } from '@/lib/api'

const Maintenance = dynamic(() => import('@/components/Maintenance'))

function MyApp({ Component, pageProps, layoutData, maintenance }) {
  const { pathname, push } = useRouter()

  const { active, available_date, image } = maintenance

  const page =
    layoutData.navigation.pages.find(({ slug }) => pathname.includes(slug)) ||
    '/'

  useEffect(() => {
    if (active) {
      push('/')
    }
  }, [active])

  if (active) {
    return <Maintenance date={available_date} image={image.url} />
  }

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
  const maintenance = await getMaintenanceStatus()

  return { pageProps, layoutData, maintenance }
}

export default MyApp
