import Section from '@/components/Section'
import { getPageContent } from '@/lib/api'
import markdownToHtml from '@/lib/markdownToHtml'
import markdownStyles from '@/components/markdown-styles.module.css'

import { languages } from '../../i18n'
import { getLangDict } from '@/utils/language'

const privacyPolicy = ({ name, content }) => {
  return (
    <Section title={name}>
      <div
        className={markdownStyles['markdown']}
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </Section>
  )
}

export default privacyPolicy

export const getStaticPaths = async () => {
  return {
    paths: languages.map((l) => ({ params: { lng: l } })),
    fallback: false,
  }
}

export const getStaticProps = async ({ params }) => {
  const page = await getPageContent({ lng: params.lng, slug: 'privacy-policy' })
  const content = await markdownToHtml(page?.content || '')

  const { default: lngDict = {} } = await getLangDict(params.lng)

  return {
    props: {
      name: page?.name,
      content,
      lng: params.lng,
      lngDict,
    },
    revalidate: 1,
  }
}
