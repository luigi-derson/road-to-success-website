import Image from 'next/image'

const DriverPortrait = ({ portrait, name }) => {
  return (
    <div
      className="px-0 py-4 w-full md:px-4 md:w-1/2 lg:w-1/4 lg:p-0 lg:m-4 group"
      data-aos="fade-up"
    >
      <div className="relative">
        <Image
          className="block object-cover object-top-center"
          width={350}
          height={350}
          src={portrait}
          alt={name}
          fill="fixed"
        />
        <div className="absolute top-0 left-0 bottom-0 right-0 h-full w-full bg-black opacity-0 transition-opacity ease-out duration-500 group-hover:opacity-85">
          <div className="flex justify-center items-center h-full">
            <span className="text-xl font-bold">{name}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DriverPortrait
