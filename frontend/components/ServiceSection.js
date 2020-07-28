import { useEffect } from 'react'
import AOS from 'aos'

import markdownStyles from './markdown-styles.module.css'
import FadeoutBars from './FadeoutBars'

const ServiceSection = ({ backgroundImage, name, description, index }) => {
  useEffect(() => {
    AOS.init({
      duration: 2000,
      once: true,
      mirror: true,
    })
  }, [])
  const alignment = index % 2 === 0 ? 'text-right' : 'text-left'
  const animation = index % 2 === 0 ? 'fade-left' : 'fade-right'
  return (
    <section className={`pb-8 text-white ${alignment}`} data-aos={animation}>
      <div
        className="bg-no-repeat bg-cover bg-top h-64 flex items-center justify-center"
        style={{
          backgroundImage: `linear-gradient(90deg, rgba(223,0,6,0.45), rgba(0,0,0,0.45)), url(${backgroundImage})`,
        }}
      >
        <h2 className="max-w-2xl px-4 w-full font-display text-5xl uppercase">
          {name}
        </h2>
      </div>
      <div className="relative">
        <div className="max-w-2xl mx-auto px-4">
          <FadeoutBars />
          <div
            className={markdownStyles['markdown']}
            dangerouslySetInnerHTML={{ __html: description }}
          />
        </div>
      </div>
    </section>
  )
}

export default ServiceSection
