import Link from 'next/link'
import { useContext } from 'react'

import GlobalContext from './context/GlobalContext'
import Logo from './Logo'

const Navigation = () => {
  const { navigation } = useContext(GlobalContext)

  return (
    <header className="text-sm bg-black bg-opacity-85 font-display sticky top-0 z-50">
      <nav className="container flex items-center justify-between mx-auto">
        <Link href="/">
          <a className="inline-block outline-none px-4">
            <Logo />
          </a>
        </Link>

        <ul className="flex justify-between uppercase">
          {navigation.pages.map(({ id, name, slug }) => {
            if (slug === 'inicio' || slug === 'home') slug = ''
            return (
              <li key={id}>
                <Link href={`/${slug}`}>
                  <a className="inline-block p-4 outline-none hover:bg-primary transition ease-in duration-200">
                    {name}
                  </a>
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>
    </header>
  )
}

export default Navigation
