const DriverPortrait = ({ portrait, name }) => {
  return (
    <div className="m-4 relative group" data-aos="fade-up">
      <img src={portrait} alt={name} />
      <div className="absolute top-0 left-0 bottom-0 right-0 h-full w-full bg-black opacity-0 transition-opacity ease-out duration-500 group-hover:opacity-85">
        <div className="flex justify-center items-center h-full">
          <span className="text-xl font-bold">{name}</span>
        </div>
      </div>
    </div>
  )
}

export default DriverPortrait
