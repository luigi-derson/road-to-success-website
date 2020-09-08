import Link from 'next/link'

export default function CoverImage({ title, url, slug }) {
  const imageUrl = `${
    url.startsWith('/') ? process.env.NEXT_PUBLIC_STRAPI_API_URL : ''
  }${url}`
  return (
    <div className="-mx-5 sm:mx-0">
      {slug ? (
        <Link as={`/posts/${slug}`} href="/posts/[slug]">
          <a aria-label={title}>
            <img
              src={imageUrl}
              alt={title}
              className="w-full object-cover"
              style={{ maxHeight: '600px' }}
            />
          </a>
        </Link>
      ) : (
        <img
          src={imageUrl}
          alt={title}
          className="w-full object-cover"
          style={{ maxHeight: '600px' }}
        />
      )}
    </div>
  )
}