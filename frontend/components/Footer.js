const Footer = () => {
  return (
    <footer className="bg-gray-4">
      <div className="container mx-auto">
        <div className="flex justify-between my-4">
          <h1>RS</h1>
          <div className="flex items-center">
            <a href="#">YT</a>
            <a href="#">IG</a>
            <a href="#">TW</a>
            <a href="#">FB</a>
          </div>
        </div>
        <div className="flex text-sm">
          <div className="flex-auto w-auto">
            © 2020 Facundo Regalia. Todos los derechos reservados
          </div>
          <div className="flex-1">
            <ul>
              <li className="inline-block px-4 first:pl-0">
                <a href="#">Noticia Legal</a>
              </li>
              <li className="inline-block px-4 first:pl-0">
                <a href="#">Politica de Privacidad</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
