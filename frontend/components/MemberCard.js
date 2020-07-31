import React from 'react'
import { parseUrl } from '@/lib/helpers'

const MemberCard = ({ picture, name, role, achievements, experience }) => {
  const imageUrl = parseUrl(picture.url)
  return (
    <div className="w-full md:w-56 overflow-hidden bg-gray-4 m-2">
      <img
        className="w-full object-cover h-56"
        src={imageUrl}
        alt={picture.alternativeText}
      />
      <div className="p-4 text-whiter text-sm">
        <div>
          <div className="font-semibold text-white text-base">{name}</div>
          <div>{role}</div>
        </div>

        {achievements.length > 0 && (
          <div className="mt-4">
            <span className="text-gray-2 inline-block pb-2">
              Sports career and greatest achievements:
            </span>
            <ul>
              {achievements.map(({ id, achievement }) => (
                <li key={id}>• {achievement}</li>
              ))}
            </ul>
          </div>
        )}

        {experience && (
          <div className="mt-4">
            <span className="text-gray-2 inline-block pb-2">
              Coach Experience:
            </span>
            <p>{experience}</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default MemberCard
