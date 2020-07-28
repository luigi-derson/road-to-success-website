import React from 'react'
import ServiceSection from '@/components/ServiceSection'
import { getAllServices } from '@/lib/api'
import markdownToHtml from '@/lib/markdownToHtml'
import { parseUrl } from '@/lib/helpers'

const services = ({ services }) => {
  return (
    <div>
      {services.map(({ id, name, description, image }, index) => {
        return (
          <ServiceSection
            index={index + 1}
            key={id}
            name={name}
            description={description}
            backgroundImage={parseUrl(image.url)}
          />
        )
      })}
    </div>
  )
}

export const getStaticProps = async () => {
  const services = await getAllServices().then(({ services }) =>
    Promise.all(
      services.map(async (service) => {
        const content = await markdownToHtml(service.description)
        return {
          id: service.id,
          name: service.name,
          image: service.image,
          description: content,
        }
      })
    )
  )

  return {
    props: {
      services,
    },
  }
}

export default services
