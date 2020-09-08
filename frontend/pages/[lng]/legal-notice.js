import Section from '@/components/Section'
import { getPageContent } from '@/lib/api'
import markdownToHtml from '@/lib/markdownToHtml'
import markdownStyles from '@/components/markdown-styles.module.css'

import { languages } from '../../i18n'
import { getLangDict } from '@/utils/language'

const legalNotice = ({ name, content }) => {
  return (
    <Section title={name}>
      <div
        className={markdownStyles['markdown']}
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </Section>
  )
}

export default legalNotice

export const getStaticPaths = async () => {
  return {
    paths: languages.map((l) => ({ params: { lng: l } })),
    fallback: false,
  }
}

export const getStaticProps = async ({ params }) => {
  const page = await getPageContent({ lng: params.lng, slug: 'legal-notice' })
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
