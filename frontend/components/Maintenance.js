import Head from 'next/head'
import { useEffect } from 'react'
import { useRouter } from 'next/router'

import { parseUrl } from '@/lib/helpers'
import Logo from './Logo'

const Maintenance = ({ image, description }) => {
  const router = useRouter()

  useEffect(() => {
    router.push('/')
  }, [])

  return (
    <>
      <Head>
        <title>Road To Success Official Website</title>
        <meta name="description" content="Road to success motorsport" />
        <meta name="robots" content="index,follow" />
        <meta name="googlebot" content="index,follow" />
        <meta name="Classification" content="Business" />
        <meta name="author" content="Luigi, luigi.prodesign@gmail.com" />
        <meta name="designer" content="Luigi Derson" />
        <meta name="copyright" content="Road To Success" />
        <meta name="theme-color" content="#000" />
      </Head>
      <div className="w-screen h-screen bg-image">
        <div className="h-full bg-black bg-opacity-50">
          <div className="container mx-auto h-full">
            <div className="h-full flex flex-col justify-center items-center">
              <div className="w-16 lg:w-20 mb-8">
                <Logo />
              </div>
              <h2 className="text-base mt-12 md:mt-16 lg:mt-20 md:text-lg lg:text-3xl font-display uppercase tracking-widest">
                {description}
              </h2>
            </div>
          </div>
        </div>

        <style jsx>
          {`
            body {
              background-color: #000;
            }

            .bg-image {
              background-image: url(${parseUrl(image)});
              background-size: cover;
              background-repeat: no-repeat;
              background-position: center center;
            }
          `}
        </style>
      </div>
    </>
  )
}

export default Maintenance
