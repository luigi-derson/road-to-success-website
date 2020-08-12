import Link from 'next/link'
import { parseUrl } from '@/lib/helpers'

const BlogCard = ({ slug, image, title, excerpt, date }) => {
  const imageUrl = parseUrl(image.url)

  return (
    <Link as={`/posts/${slug}`} href="/posts/[slug]">
      <a className="group block p-4 md:w-1/2 lg:w-1/3">
        <div className="h-full border border-gray-3 transition-transform transform duration-300 ease-linear hover:border-primary group-hover:scale-105">
          <img
            className="w-full object-cover h-48"
            src={imageUrl}
            alt={image.alternativeText}
          />
          <div className="p-4">
            <span className="text-xs text-gray-2">{date}</span>
            <h2 className="py-4 text-xl md:text-lg font-display">{title}</h2>
            <p className="text-lg md:text-sm text-gray-2">{excerpt}</p>
          </div>
        </div>
      </a>
    </Link>
  )
}

export default BlogCard
