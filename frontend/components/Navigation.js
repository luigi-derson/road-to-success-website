import Link from 'next/link'
import { useContext } from 'react'

import GlobalContext from './context/GlobalContext'
import Logo from './Logo'

const Navigation = () => {
  const { navigation } = useContext(GlobalContext)

  return (
    <header className="text-sm bg-black bg-opacity-85 font-display sticky top-0 z-50">
      <div className="container mx-auto">
        <nav className="flex items-center justify-between">
          <Link href="/">
            <a className="inline-block outline-none px-4">
              <Logo />
            </a>
          </Link>

          <ul className="flex justify-between uppercase">
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
        </nav>
      </div>
    </header>
  )
}

export default Navigation
