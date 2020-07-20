import Link from 'next/link'
import Logo from './Logo'

const Navigation = () => {
  return (
    <header className="text-sm bg-black bg-opacity-85 font-display sticky top-0 z-50">
      <nav className="container flex items-center justify-between mx-auto">
        <Link href="/">
          <a className="inline-block px-4">
            <Logo />
          </a>
        </Link>

        <ul className="flex justify-between uppercase">
          <li>
            <Link href="/">
              <a className="inline-block p-4 outline-none hover:bg-primary transition ease-in duration-200">
                Home
              </a>
            </Link>
          </li>
          <li>
            <Link href="/about">
              <a className="inline-block p-4 outline-none hover:bg-primary transition ease-in duration-200">
                About
              </a>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Navigation
