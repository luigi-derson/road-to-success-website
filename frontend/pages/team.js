import { useEffect } from 'react'
import AOS from 'aos'

import Section from '@/components/Section'
import MemberCard from '@/components/MemberCard'
import { getAllMembers } from '@/lib/api'

const about = ({ members }) => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    })
  }, [])
  return (
    <div>
      <Section
        sectionStyle="bg-no-repeat bg-cover bg-left-bottom h-screen flex items-end"
        backgroundImage="/uploads/team_hero_min_b1c2cb0220.jpegg"
      >
        <div className="h-full pb-32 ">
          <h1 className="text-5xl font-bold font-display mb-4">Who we are</h1>
          <p className="max-w-xl">
            Road To Success is a successful coaching and management company
            founded in 2018 and currently working with outfits and drivers such
            as Van Amersfoort Racing, Juncos Racing, Drivex, Sophia Floersch,
            Artem Petrov, Pierre-Louis Chovet and Alessandro Famularo. Last but
            not least, at the end of 2019 Road To Success expanded into new
            markets arriving in the United States. Regalia and Franzoni are
            strongly focused on the American market currently working there with
            Juncos Racing and Petrov.
          </p>
        </div>
      </Section>

      <Section title="Team">
        <div className="flex flex-wrap" data-aos="fade-up">
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

export const getStaticProps = async () => {
  const res = await getAllMembers()
  return {
    props: {
      members: res.members,
    },
  }
}

export default about
