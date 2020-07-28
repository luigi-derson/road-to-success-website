import { parseUrl } from '@/lib/helpers'
import Container from './Container'

const Section = ({
  title = '',
  children,
  sectionStyle = '',
  backgroundImage = '',
}) => {
  const imageUrl = parseUrl(backgroundImage)

  return (
    <section
      className={`py-10 ${sectionStyle}`}
      style={{
        backgroundImage: `url(${imageUrl})`,
      }}
    >
      {title && (
        <h2 className="mt-4 mb-10 text-xl uppercase text-center font-display">
          {title}
        </h2>
      )}
      <Container>{children}</Container>
    </section>
  )
}

export default Section
