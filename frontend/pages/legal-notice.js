import Section from '@/components/Section'
import { getPageContent } from '@/lib/api'
import markdownToHtml from '@/lib/markdownToHtml'
import markdownStyles from '@/components/markdown-styles.module.css'

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

export const getStaticProps = async () => {
  const data = await getPageContent('legal-notice')
  const content = await markdownToHtml(data?.pages[0]?.content || '')

  return {
    props: {
      name: data?.pages[0]?.name,
      content,
    },
  }
}
