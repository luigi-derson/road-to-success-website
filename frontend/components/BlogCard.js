import React from 'react'

const BlogCard = ({ href, image, title, excerpt, date }) => {
  return (
    <a className="inline-block" href={href}>
      <div className="w-full md:w-blog-card border border-gray-3 hover:border-primary">
        <img
          className="w-full object-cover h-48"
          src={image.url}
          alt={image.alt}
        />
        <div className="p-4">
          <span className="text-xs text-gray-2">{date}</span>
          <h2 className="py-4 text-lg font-display">{title}</h2>
          <p className="text-sm text-gray-2">{excerpt}</p>
        </div>
      </div>
    </a>
  )
}

export default BlogCard
