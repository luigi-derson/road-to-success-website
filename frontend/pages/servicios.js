import React from 'react'
import ServiceSection from '@/components/ServiceSection'
import { getAllServices } from '@/lib/api'
import markdownToHtml from '@/lib/markdownToHtml'

const services = ({ services }) => {
  return (
    <div>
      {services.map(({ id, name, description, image }) => {
        return (
          <ServiceSection
            key={id}
            name={name}
            description={description}
            backgroundImage={image.url}
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
