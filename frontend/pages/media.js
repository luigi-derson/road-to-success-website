import { useState, useCallback } from 'react'
import Carousel, { Modal, ModalGateway } from 'react-images'
import Gallery from 'react-photo-gallery'

import Container from '@/components/Container'
import { getMedia } from '@/lib/api'
import { solveDimension } from '@/lib/helpers'

const media = ({ photos }) => {
  const [currentImage, setCurrentImage] = useState(0)
  const [viewerIsOpen, setViewerIsOpen] = useState(false)

  const openLightbox = useCallback((event, { photo, index }) => {
    setCurrentImage(index)
    setViewerIsOpen(true)
  }, [])

  const imageRenderer = useCallback(
    ({ index, photo, onClick }) => (
      <div
        key={index}
        className="relative group m-2 cursor-pointer"
        style={{ height: photo.height, width: photo.width }}
        onClick={(e) => onClick(e, { photo, index })}
      >
        <img
          className="abosolute w-full h-full top-0 object-cover"
          src={photo.src}
        />
        <div className="opacity-0 absolute w-full h-full bg-black top-0 left-0 group-hover:opacity-85 transition-opacity duration-300 ease-in">
          <div className="flex flex-col h-full justify-end items-end">
            <div className="p-4 mr-2">
              <p className="text-xl font-bold">{photo.title}</p>
              <span className="text-sm">{photo.date}</span>
            </div>
          </div>
        </div>
      </div>
    ),
    []
  )

  const closeLightbox = () => {
    setCurrentImage(0)
    setViewerIsOpen(false)
  }
  return (
    <div className="py-16 h-full">
      <Container>
        <Gallery
          photos={photos}
          renderImage={imageRenderer}
          onClick={openLightbox}
        />
        <ModalGateway>
          {viewerIsOpen ? (
            <Modal onClose={closeLightbox}>
              <Carousel
                currentIndex={currentImage}
                views={photos.map((x) => ({
                  ...x,
                  srcset: x.srcSet,
                  caption: x.title,
                }))}
              />
            </Modal>
          ) : null}
        </ModalGateway>
      </Container>
    </div>
  )
}

export default media

export const getStaticProps = async () => {
  const photos = (await getMedia()) || []

  const mappedPhotos = photos.map(({ title, date, id, image }) => {
    const x = image.width - image.height
    const y = image.height - image.width
    const width = solveDimension(x)
    const height = solveDimension(y)

    return {
      id,
      title,
      date,
      src: process.env.NEXT_PUBLIC_STRAPI_API_URL + image.url,
      width,
      height,
    }
  })

  return {
    props: {
      photos: mappedPhotos,
    },
  }
}
