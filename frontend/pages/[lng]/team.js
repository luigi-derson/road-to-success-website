import { useEffect } from 'react'
import AOS from 'aos'
import { useI18n } from 'next-localization'

import Section from '@/components/Section'
import MemberCard from '@/components/MemberCard'
import { getAllMembers, getPageContent } from '@/lib/api'
import { orderByInteger } from '@/lib/helpers'

import { languages } from '../../i18n'
import { getLangDict } from '@/utils/language'
import markdownToHtml from '@/lib/markdownToHtml'
import markdownStyles from '@/components/markdown-styles.module.css'

const about = ({ members, content }) => {
  const { t } = useI18n()

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    })
  }, [])
  return (
    <div>
      <Section
        sectionStyle="bg-no-repeat bg-cover h-screen flex items-end bg-fixed"
        backgroundImage="/uploads/team_hero_min_b1c2cb0220.jpeg"
      >
        <div className="max-w-xl">
          <div
            className={markdownStyles['markdown']}
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </div>
      </Section>

      <Section title={t('team.team_section_title')}>
        <div className="flex flex-wrap first:pl-0">
          {members.map(
            ({ id, name, role, achievements, experience, picture }) => (
              <MemberCard
                key={id}
                name={name}
                role={role}
                achievements={achievements}
                experience={experience}
                picture={picture}
              />
            )
          )}
        </div>
      </Section>
    </div>
  )
}

export const getStaticPaths = async () => {
  return {
    paths: languages.map((l) => ({ params: { lng: l } })),
    fallback: false,
  }
}

export const getStaticProps = async ({ params }) => {
  const members = await getAllMembers(params.lng)
  const { default: lngDict = {} } = await getLangDict(params.lng)

  const page = await getPageContent({ lng: params.lng, slug: 'team' })
  const content = await markdownToHtml(page?.content || '')

  return {
    props: {
      members: orderByInteger(members),
      lng: params.lng,
      lngDict,
      content,
    },
    revalidate: 1,
  }
}

export default about
