import React from 'react'
import ServiceSection from '@/components/ServiceSection'
import { getAllServices } from '@/lib/api'
import markdownToHtml from '@/lib/markdownToHtml'
import { parseUrl } from '@/lib/helpers'

import { languages } from '../../i18n'
import { getLangDict } from '@/utils/language'

const services = ({ services }) => {
  return (
    <div className="overflow-x-hidden">
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

export const getStaticPaths = async () => {
  return {
    paths: languages.map((l) => ({ params: { lng: l } })),
    fallback: false,
  }
}

export const getStaticProps = async ({ params }) => {
  const { default: lngDict = {} } = await getLangDict(params.lng)

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
      lng: params.lng,
      lngDict,
    },
    revalidate: 1,
  }
}

export default services
