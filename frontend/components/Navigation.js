import Link from 'next/link'

const Navigation = () => {
  return (
    <header className="text-sm bg-black bg-opacity-85 font-display">
      <nav className="container flex items-center justify-between mx-auto">
        <h1 className="p-4">RS</h1>
        <ul className="flex justify-between uppercase">
          <li>
            <Link href="/">
              <a className="p-4 outline-none hover:bg-primary transition ease-in duration-200">
                Home
              </a>
            </Link>
          </li>
          <li>
            <Link href="/">
              <a className="p-4 outline-none hover:bg-primary transition ease-in duration-200">
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
