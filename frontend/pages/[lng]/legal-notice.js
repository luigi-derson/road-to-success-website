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
  const { lng } = params
  const page = await getPageContent('legal-notice')
  const { default: lngDict = {} } = await getLangDict(lng)

  const parseDataByLanguage = (lang, data, key) =>
    lang === 'en' ? data[`${key}`] : data[`${key}_es`]

  const pageContent = parseDataByLanguage(lng, page, 'content')

  const content = await markdownToHtml(pageContent || '')

  const name = parseDataByLanguage(lng, page, 'name')

  return {
    props: {
      name,
      content,
      lng,
      lngDict,
    },
    revalidate: 1,
  }
}
