import Link from 'next/link'
import { useContext, useState } from 'react'

import GlobalContext from './context/GlobalContext'
import Logo from './Logo'

const Navigation = () => {
  const [open, setOpen] = useState(false)
  const { navigation } = useContext(GlobalContext)

  return (
    <header className="text-sm bg-black bg-opacity-85 font-display sticky top-0 z-50">
      <div className="container mx-auto">
        <nav className="flex items-center justify-between">
          <Link href="/">
            <a className="inline-block outline-none p-4 md:px-4">
              <Logo />
            </a>
          </Link>

          <ul className="hidden md:flex justify-between uppercase">
            {navigation.pages.map(({ id, name, slug }) => {
              if (slug === 'inicio' || slug === 'home') slug = ''
              return (
                <li
                  key={id}
                  className="hover:bg-primary transition ease-in duration-300 transform -skew-x-12 cursor-pointer"
                >
                  <Link href={`/${slug}`}>
                    <a className="inline-block p-4 outline-none transform skew-x-12">
                      {name}
                    </a>
                  </Link>
                </li>
              )
            })}
          </ul>
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
        </nav>
      </div>
    </header>
  )
}

export default Navigation
