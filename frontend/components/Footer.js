import { useContext } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

import GlobalContext from '@/components/context/GlobalContext'
import Container from './Container'
import { LogoWhite } from './icons'

const Footer = () => {
  const router = useRouter()
  const { footer } = useContext(GlobalContext)
  const locale = router.query.lng

  return (
    <footer className="bg-gray-4">
      <Container>
        <div className="flex flex-col justify-end h-auto md:h-48 pt-8">
          <div className="flex justify-between my-4">
            <div>
              <LogoWhite />
            </div>
            <div className="flex items-center">
              {footer.socials.map(({ id, name, url, logo }) => {
                return (
                  <a
                    key={id}
                    href={url}
                    target="_blank"
                    rel="noreferrer"
                    className="px-3"
                  >
                    <img
                      src={process.env.NEXT_PUBLIC_STRAPI_API_URL + logo.url}
                      alt={name}
                    />
                  </a>
                )
              })}
            </div>
          </div>
          <div className="flex flex-wrap text-sm my-4 py-2">
            <div className="flex-auto w-auto order-last md:order-none">
              {footer.copyright}
            </div>
            <div className="my-6 md:my-0">
              <ul>
                {footer.pages.map(({ id, name, slug }) => (
                  <li key={id} className="inline-block pr-6 md:px-4 first:pl-0">
                    <Link href={`/${locale}/${slug}`}>
                      <a>{name}</a>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  )
}

export default Footer
