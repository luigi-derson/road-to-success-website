import { useEffect } from 'react'
import AOS from 'aos'

import { getAllSponsors, getAllPostsForHome } from '@/lib/api.js'

import Section from '@/components/Section'
import BlogCard from '@/components/BlogCard'
import InstaCard from '@/components/InstaCard'
import { parseUrl } from '@/lib/helpers'

const Index = ({ posts, sponsors }) => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    })
  }, [])

  const flexRule = posts.length > 2 ? 'justify-between' : 'justify-center'

  const settings = {
    infinite: true,
    fade: true,
    draggable: false,
    lazyLoad: true,
    speed: 500,
    slidesToShow: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  }

  return (
    <>
      <div data-aos="fade" data-aos-duration="2500">
        <Section
          sectionStyle="bg-no-repeat bg-cover h-screen flex items-center justify-center"
          backgroundImage="/uploads/73f7370c_b858_48ad_bedb_a60ca09d11ca_dec130bdbd.jpeg"
        >
          <div className="h-full text-center align-middle font-display uppercase">
            <h1 className="text-7xl font-bold">Road To Success</h1>
            <h2 className="text-xl">Official Website</h2>
          </div>
        </Section>
        <Section title="Latest News">
          <div className={`flex flex-wrap ${flexRule}`} data-aos="fade-up">
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
          </div>
        </Section>
      </div>

      <Section title="Latest Posts" sectionStyle="bg-primary">
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

      <Section title="Sponsors">
        <div
          className="py-10 flex justify-between items-center"
          data-aos="zoom-in"
        >
          {sponsors.map(({ id, name, logo, website }) => (
            <a key={id} href={website}>
              <img className="h-full" src={parseUrl(logo.url)} alt={name} />
            </a>
          ))}
        </div>
      </Section>
    </>
  )
}

export default Index

export const getStaticProps = async ({ preview = null }) => {
  const posts = (await getAllPostsForHome(preview)) || []
  const sponsors = await getAllSponsors()

  return {
    props: {
      posts,
      sponsors,
    },
  }
}
