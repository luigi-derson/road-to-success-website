import { useI18n } from 'next-localization'

import Section from '@/components/Section'
import { MailIcon } from '@/components/icons'

import { languages } from '../../i18n'
import { getLangDict } from '@/utils/language'

const Contact = () => {
  const { t } = useI18n()
  return (
    <Section>
      <div
        style={{
          height: 'calc(100vh - 341px)',
        }}
      >
        <h2 className="mt-4 mb-10 text-xl uppercase font-display">
          {t('contact.title')}
        </h2>
        <p className="py-2">{t('contact.description')}</p>
        <div className="mt-5">
          <div className="flex items-center my-2">
            <a
              className="inline-block text-primary"
              href="mailto:facuregalia@rtsprogram.com"
            >
              <MailIcon />
              facuregalia@rtsprogram.com
            </a>
          </div>
          <div className="flex items-center my-2">
            <a
              className="inline-block text-primary"
              href="mailto:abelroig@rtsprogram.comm"
            >
              <MailIcon />
              abelroig@rtsprogram.com
            </a>
          </div>
        </div>
      </div>
    </Section>
  )
}

export const getStaticPaths = async () => {
  return {
    paths: languages.map((l) => ({ params: { lng: l } })),
    fallback: false,
  }
}

export const getStaticProps = async ({ params }) => {
  const { default: lngDict = {} } = await getLangDict(params.lng)
  return {
    props: {
      lng: params.lng,
      lngDict,
    },
  }
}

export default Contact
