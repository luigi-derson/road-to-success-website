import Section from '@/components/Section'

const about = () => {
  return (
    <div>
      <Section
        sectionStyle="bg-no-repeat bg-cover h-screen flex items-end justify-start"
        backgroundImage="http://localhost:1337/uploads/hero_about_6d14e2f26b.png"
      >
        <div className="h-full">
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
    </div>
  )
}

export default about
