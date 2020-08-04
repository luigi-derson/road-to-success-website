import Link from 'next/link'
import { useContext, useState } from 'react'

import GlobalContext from './context/GlobalContext'
import Logo from './Logo'

const Navigation = () => {
  const { navigation } = useContext(GlobalContext)
  const [open, setOpen] = useState(false)

  const handleOpenLink = () => {
    if (open) setOpen(!open)
    return
  }

  return (
    <header className="text-sm bg-black bg-opacity-85 font-display sticky top-0 z-50 overflow-x-hidden">
      <div className="container mx-auto">
        <nav className="flex items-center justify-between flex-wrap">
          <Link href="/">
            <a className="inline-block outline-none p-4 md:py-0 w-20 md:w-24">
              <Logo />
            </a>
          </Link>

          <button
            className="md:hidden pr-4 rounded-lg focus:outline-none outline-none focus:text-primary"
            onClick={() => setOpen(!open)}
          >
            <svg
              fill="currentColor"
              viewBox="0 0 20 20"
              className="w-8 h-8 hover:text-primary"
            >
              {open ? (
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              ) : (
                <path
                  fillRule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z"
                  clipRule="evenodd"
                ></path>
              )}
            </svg>
          </button>

          <div
            className={
              open ? 'w-full z-50 h-mobile-menu relative' : 'hidden md:block'
            }
          >
            <ul
              className={`flex uppercase ${
                open
                  ? 'flex-col justify-center text-center h-full text-lg'
                  : 'justify-between'
              }`}
            >
              {navigation.pages.map(({ id, name, slug }) => {
                if (slug === 'inicio' || slug === 'home') slug = ''
                return (
                  <li
                    key={id}
                    className={`hover:bg-primary transition ease-in duration-300 ${
                      open
                        ? 'w-full active:bg-primary'
                        : 'transform -skew-x-12 cursor-pointer'
                    }`}
                    onClick={handleOpenLink}
                  >
                    <Link href={`/${slug}`}>
                      <a
                        className={`inline-block p-4 md:p-5 outline-none transform ${
                          open ? 'w-full' : 'skew-x-12'
                        }`}
                      >
                        {name}
                      </a>
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>
        </nav>
      </div>
      {open && (
        <style global jsx>{`
          body {
            overflow: hidden;
          }
        `}</style>
      )}
    </header>
  )
}

export default Navigation
