import Navigation from './Navigation'
import Footer from './Footer'

const Layout = ({ children }) => {
  return (
    <>
      <Navigation />
      {children}
      <Footer />
    </>
  )
}

export default Layout
