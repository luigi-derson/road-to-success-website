import { useEffect } from 'react'
import AOS from 'aos'
import { useI18n } from 'next-localization'

import Section from '@/components/Section'
import { getAllDrivers, getAllTeams } from '@/lib/api'
import { parseUrl, orderByInteger } from '@/lib/helpers'
import DriverPortrait from '@/components/DriverPortrait'

import { languages } from '../../i18n'
import { getLangDict } from '@/utils/language'

const clientes = ({ drivers, teams }) => {
  const { t } = useI18n()

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    })
  }, [])
  return (
    <>
      <Section title={t('drivers.teams_section_title')}>
        <div
          className="py-10 flex justify-center items-center flex-wrap"
          data-aos="fade"
        >
          {teams.map(({ id, name, logo }) => (
            <div key={id} className="inline-block w-full md:w-auto text-center">
              <img
                className="inline-block h-full m-10 md:my-0r md:mx-20 w-48"
                src={parseUrl(logo.url)}
                alt={name}
              />
            </div>
          ))}
        </div>
      </Section>
      <Section
        title={t('drivers.drivers_section_title')}
        sectionStyle="bg-primary"
      >
        <div className="flex justify-center flex-wrap">
          {drivers.map(({ id, name, portrait }) => (
            <DriverPortrait
              key={id}
              portrait={parseUrl(portrait.url)}
              name={name}
            />
          ))}
        </div>
      </Section>
    </>
  )
}

export default clientes

export const getStaticPaths = async () => {
  return {
    paths: languages.map((l) => ({ params: { lng: l } })),
    fallback: false,
  }
}

export const getStaticProps = async ({ params }) => {
  const drivers = (await getAllDrivers()) || []
  const teams = (await getAllTeams()) || []

  const { default: lngDict = {} } = await getLangDict(params.lng)

  return {
    props: {
      teams: orderByInteger(teams),
      drivers: orderByInteger(drivers),
      lng: params.lng,
      lngDict,
    },
    revalidate: 1,
  }
}
