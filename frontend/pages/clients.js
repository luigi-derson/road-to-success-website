import { useEffect } from 'react'
import AOS from 'aos'

import Section from '@/components/Section'
import { getAllDrivers, getAllTeams } from '@/lib/api'
import { parseUrl } from '@/lib/helpers'
import DriverPortrait from '@/components/DriverPortrait'

const clientes = ({ drivers, teams }) => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    })
  }, [])
  return (
    <>
      <Section title="Teams">
        <div className="flex justify-between items-center py-10">
          {teams.map(({ id, name, logo }) => (
            <img key={id} src={parseUrl(logo.url)} alt={name} />
          ))}
        </div>
      </Section>
      <Section title="Drivers" sectionStyle="bg-primary">
        <div className="flex justify-center flex-wrap" data-aos="fade-up">
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

export const getStaticProps = async () => {
  const drivers = (await getAllDrivers()) || []
  const teams = (await getAllTeams()) || []

  return {
    props: {
      teams,
      drivers,
    },
  }
}
