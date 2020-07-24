import markdownStyles from './markdown-styles.module.css'
import { parseUrl } from '@/lib/helpers'

const ServiceSection = ({ backgroundImage, name, description }) => {
  const imageUrl = parseUrl(backgroundImage)

  return (
    <section className="pb-8 text-white">
      <div
        className="bg-no-repeat bg-cover bg-top h-64 flex items-center justify-center"
        style={{
          backgroundImage: `linear-gradient(90deg, rgba(223,0,6,0.45), rgba(0,0,0,0.45)), url(${imageUrl})`,
        }}
      >
        <h2 className="max-w-xl px-4 w-full font-display text-5xl uppercase">
          {name}
        </h2>
      </div>
      <div className="max-w-xl mx-auto px-4">
        <div
          className={markdownStyles['markdown']}
          dangerouslySetInnerHTML={{ __html: description }}
        />
      </div>
    </section>
  )
}

export default ServiceSection
