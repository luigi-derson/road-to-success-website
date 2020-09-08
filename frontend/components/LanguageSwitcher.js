import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { GBFlag, ESFlag } from './icons'

const LanguageSwitcher = ({ lang }) => {
  const router = useRouter()

  const [locale, setLocale] = useState('')

  const changeLanguage = () => {
    const { pathname } = router

    // Fix when the browser is in post page
    const parsedPath = pathname.includes('[slug]')
      ? `/${locale}`
      : pathname.replace(/\[lng\]/, locale)

    router.push(parsedPath)
  }

  useEffect(() => {
    lang === 'en' ? setLocale('es') : setLocale('en')
  }, [lang])

  return (
    <div>
      <button
        className="text-white transition-colors p-5 hover:text-primary inline-flex outline-none focus:outline-none"
        type="button"
        onClick={changeLanguage}
      >
        {locale.toUpperCase()}
        {locale === 'en' ? (
          <GBFlag className="inline-block ml-2 w-6" />
        ) : (
          <ESFlag className="inline-block ml-2 w-6" />
        )}
      </button>
    </div>
  )
}

export default LanguageSwitcher
