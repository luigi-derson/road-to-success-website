import React from 'react'
import { parseUrl } from '@/lib/helpers'

const MemberCard = ({ picture, name, role, achievements, experience }) => {
  const imageUrl = parseUrl(picture.url)
  return (
    <div
      className="md:w-1/2 lg:w-1/5 overflow-hidden p-4 lg:px-2"
      data-aos="fade-up"
    >
      <div className="h-full bg-gray-4 bg-opacity-75">
        <img
          className="w-full object-cover object-top h-72 lg:h-56"
          src={imageUrl}
          alt={picture.alternativeText}
        />
        <div className="h-full p-4 text-whiter md:text-sm">
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
    </div>
  )
}

export default MemberCard
