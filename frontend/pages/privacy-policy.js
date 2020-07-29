import Section from '@/components/Section'
import { getPageContent } from '@/lib/api'
import markdownToHtml from '@/lib/markdownToHtml'
import markdownStyles from '@/components/markdown-styles.module.css'

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

export const getStaticProps = async () => {
  const data = await getPageContent('privacy-policy')
  const content = await markdownToHtml(data?.pages[0]?.content || '')

  return {
    props: {
      name: data?.pages[0]?.name,
      content,
    },
  }
}
