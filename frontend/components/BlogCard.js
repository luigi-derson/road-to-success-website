import Link from 'next/link'
import { parseUrl } from '@/lib/helpers'

const BlogCard = ({ slug, image, title, excerpt, date }) => {
  const imageUrl = parseUrl(image.url)

  return (
    <Link as={`/posts/${slug}`} href="/posts/[slug]">
      <a className="block m-4">
        <div className="w-full h-full md:w-blog-card border border-gray-3 hover:border-primary">
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
