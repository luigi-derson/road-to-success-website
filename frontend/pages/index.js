import { getAllPosts } from '@/lib/api.js'

import Section from '@/components/Section'
import BlogCard from '@/components/BlogCard'
import InstaCard from '@/components/InstaCard'

const Index = ({ posts }) => {
  return (
    <>
      <Section
        sectionStyle="bg-no-repeat bg-cover h-screen flex items-center justify-center"
        backgroundImage="/uploads/73f7370c_b858_48ad_bedb_a60ca09d11ca_dec130bdbd.jpeg"
      >
        <div className="h-full text-center align-middle font-display uppercase">
          <h1 className="text-7xl font-bold">Road To Success</h1>
          <h2 className="text-xl">Pagina Oficial</h2>
        </div>
      </Section>
      <Section title="Ultimas Noticias">
        {posts.map(({ id, image, slug, title, excerpt, date }) => (
          <BlogCard
            key={id}
            slug={slug}
            image={image}
            title={title}
            excerpt={excerpt}
            date={date}
          />
        ))}
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
  const res = await getAllPosts()

  return {
    props: {
      posts: res.posts,
    },
  }
}
