import { useEffect } from 'react'
import AOS from 'aos'
import { useI18n } from 'next-localization'

import { languages } from '../../i18n'

import {
  getAllSponsors,
  getAllPostsForHome,
  getInstagramPosts,
  getSliderImages,
} from '@/lib/api.js'

import Section from '@/components/Section'
import BlogCard from '@/components/BlogCard'
import InstaCard from '@/components/InstaCard'
import { parseUrl, orderByInteger } from '@/lib/helpers'
import Slider from 'react-slick'
import { getLangDict } from '@/utils/language'

const Index = ({ posts, sponsors, instagramPosts, sliderImages }) => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    })
  }, [])

  const { t } = useI18n()

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
    arrows: false,
  }

  return (
    <>
      <div
        className="overflow-x-hidden relative"
        data-aos="fade"
        data-aos-duration="2500"
      >
        <Slider {...settings}>
          {sliderImages.map(({ id, url, alternativeText }) => {
            return (
              <img
                key={id}
                className="block h-screen object-cover"
                src={parseUrl(url)}
                alt={alternativeText}
              />
            )
          })}
        </Slider>
        <div className="h-full w-full absolute top-0 left-0 text-center font-display uppercase flex flex-col justify-center">
          <h1 className="text-5xl md:text-7xl lg:text-9xl font-bold text-shadow transform -skew-x-6">
            Road To Success
          </h1>
          <h2 className="text-xl md:text-2xl lg:text-3xl text-shadow">
            {t('home.subtitle')}
          </h2>
        </div>
      </div>

      <Section title={t('home.blog_section_title')}>
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

      <Section
        title={t('home.instagram_section_title')}
        sectionStyle="bg-primary"
      >
        <div className="flex justify-between items-center flex-wrap py-10">
          {instagramPosts.map(
            ({
              id,
              media_url,
              caption,
              permalink,
              thumbnail_url,
              media_type,
            }) => {
              const picture = media_type === 'VIDEO' ? thumbnail_url : media_url
              return (
                <InstaCard
                  key={id}
                  href={permalink}
                  picture={picture}
                  caption={caption}
                  likes="100"
                  comments="200"
                />
              )
            }
          )}
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
              target="_blank"
              rel="noreferrer"
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

export const getStaticPaths = async () => {
  return {
    paths: languages.map((l) => ({ params: { lng: l } })),
    fallback: false,
  }
}

export const getStaticProps = async ({ preview = null, params }) => {
  const posts = (await getAllPostsForHome(params.lng, preview)) || []
  const sponsors = await getAllSponsors()
  const sliderImages = await getSliderImages()

  const instagramPosts = (await getInstagramPosts()) || []

  const { default: lngDict = {} } = await getLangDict(params.lng)

  return {
    props: {
      posts,
      sponsors: orderByInteger(sponsors),
      instagramPosts,
      sliderImages,
      lng: params.lng,
      lngDict,
    },
    revalidate: 1,
  }
}
