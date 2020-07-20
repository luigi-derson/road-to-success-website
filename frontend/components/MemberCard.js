import React from 'react'

const MemberCard = ({ picture, name, role, achievements, experience }) => {
  return (
    <div className="w-full md:w-56 overflow-hidden bg-gray-4">
      <img
        className="w-full object-cover h-56"
        src={picture.url}
        alt={picture.alt}
      />
      <div className="p-4 text-whiter text-sm">
        <div>
          <div className="font-semibold text-white text-base">{name}</div>
          <div>{role}</div>
        </div>

        <div className="mt-4">
          <span className="text-gray-2 inline-block pb-2">
            Sports career and greatest achievements:
          </span>
          <ul>
            {achievements.map((t, i) => (
              <li key={i}>{t}</li>
            ))}
          </ul>
        </div>

        <div className="mt-4">
          <span className="text-gray-2 inline-block pb-2">
            Coach Experience:
          </span>
          <p>{experience}</p>
        </div>
      </div>
    </div>
  )
}

export default MemberCard
