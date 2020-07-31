import { useEffect } from 'react'
import AOS from 'aos'

import {
  getAllSponsors,
  getAllPostsForHome,
  getInstagramPosts,
} from '@/lib/api.js'

import Section from '@/components/Section'
import BlogCard from '@/components/BlogCard'
import InstaCard from '@/components/InstaCard'
import { parseUrl } from '@/lib/helpers'

const Index = ({ posts, sponsors, instagramPosts }) => {
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
          sectionStyle="bg-no-repeat bg-cover bg-center h-screen flex items-center justify-center"
          backgroundImage="/uploads/home_hero_min_3d59feae32.jpeg"
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
        <div className="flex justify-between items-center flex-wrap py-10">
          {instagramPosts.map(({ id, media_url, caption, permalink }) => (
            <InstaCard
              key={id}
              href={permalink}
              picture={media_url}
              caption={caption}
              likes="100"
              comments="200"
            />
          ))}
        </div>
      </Section>

      <Section title="Sponsors">
        <div className="py-10 flex justify-center md:justify-between items-center flex-wrap">
          {sponsors.map(({ id, name, logo, website }) => (
            <a
              key={id}
              className="inline-block w-full md:w-auto text-center"
              href={website}
              data-aos="zoom-in"
            >
              <img
                className="inline-block h-full my-6 md:my-0"
                src={parseUrl(logo.url)}
                alt={name}
              />
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

  const instagramPosts = await getInstagramPosts()

  return {
    props: {
      posts,
      sponsors,
      instagramPosts,
    },
  }
}
