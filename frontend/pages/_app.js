import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'
import { I18nProvider } from 'next-localization'

import '@/styles/index.css'
import 'aos/dist/aos.css'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import GlobalContext from '@/components/context/GlobalContext'
import Layout from '@/components/Layout'

import { getLayoutContent, getMaintenanceStatus } from '@/lib/api'
import { configureLanguage } from '@/utils/language'

const Maintenance = dynamic(() => import('@/components/Maintenance'))

function MyApp({ Component, pageProps, layoutData, maintenance }) {
  const { pathname } = useRouter()

  const { active, available_date, image, description } = maintenance

  const page =
    layoutData.navigation.pages.find(({ slug }) => pathname.includes(slug)) ||
    '/'

  if (active) {
    return (
      <Maintenance
        date={available_date}
        description={description}
        image={image.url}
      />
    )
  }

  return (
    <I18nProvider lngDict={pageProps.lngDict} locale={pageProps.lng}>
      <GlobalContext.Provider value={layoutData}>
        <Layout title={page.name}>
          <Component {...pageProps} />
        </Layout>
      </GlobalContext.Provider>
    </I18nProvider>
  )
}

MyApp.getInitialProps = async ({ Component, ctx }) => {
  let pageProps
  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx)
  }
  const lang = configureLanguage(ctx)
  const layoutData = await getLayoutContent(lang)
  const maintenance = await getMaintenanceStatus(lang)

  return { pageProps, layoutData, maintenance }
}

export default MyApp
