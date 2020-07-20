// import { getAllPostsWithSlug } from '@/lib/api.js'

import Section from '@/components/Section'
import MemberCard from '@/components/MemberCard'
import BlogCard from '@/components/BlogCard'
import InstaCard from '@/components/InstaCard'

const Index = () => {
  return (
    <>
      <Section
        sectionStyle="bg-no-repeat bg-cover h-screen flex items-center justify-center"
        backgroundImage="http://localhost:1337/uploads/hero_image_61914d5153.png"
      >
        <div className="h-full text-center align-middle font-display uppercase">
          <h1 className="text-7xl font-bold">Road To Success</h1>
          <h2 className="text-xl">Pagina Oficial</h2>
        </div>
      </Section>
      <Section title="Ultimas Noticias">
        <BlogCard
          href="/post/id"
          image={{
            url:
              process.env.NEXT_PUBLIC_STRAPI_API_URL +
              '/uploads/coaching_98ba8dfaf8.png',
            alt: 'Coaching',
          }}
          date="25 May 2020"
          title="Post title"
          excerpt="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent suspendisse sit in elit facilisi. Tempus nulla turpis sit cras porttitor sagittis."
        />
      </Section>
      <Section title="Team">
        <MemberCard
          picture={{
            url:
              process.env.NEXT_PUBLIC_STRAPI_API_URL +
              '/uploads/member_placeholder_57d790946c.png',
            alt: 'Alt text',
          }}
          name="Luigi Sanchez"
          role="Web developer"
          achievements={[
            'Vice-Champion in GP3',
            'Vice-Champion an Auto GP',
            'Reserve pilot in Force India / GP2v',
          ]}
          experience="Some experince"
        />
      </Section>

      <Section title="Ultimos Posts" sectionStyle="bg-primary">
        <InstaCard
          href="/test/"
          picture={{
            url: 'http://localhost:1337/uploads/hero_image_61914d5153.png',
            alt: 'Alt text',
          }}
          caption="some description"
          likes="100"
          comments="200"
        />
      </Section>

      <Section title="Sponsors"></Section>
    </>
  )
}

export default Index

export const getStaticProps = async () => {
  // const allPosts = (await getAllPostsWithSlug()) || []

  return {
    props: {
      // allPosts,
    },
  }
}
