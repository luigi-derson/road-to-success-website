const ServiceSection = ({ backgroundImage, name, description }) => {
  return (
    <section className="pb-8 text-white">
      <div
        className="bg-top h-64 flex items-center justify-center"
        style={{
          backgroundImage: `linear-gradient(90deg, rgba(223,0,6,0.45), rgba(0,0,0,0.45)), url(${backgroundImage})`,
        }}
      >
        <h2 className="max-w-xl px-4 w-full font-display text-5xl uppercase">
          {name}
        </h2>
      </div>
      <div className="max-w-xl mx-auto px-4">
        <p className="mt-10">{description}</p>
      </div>
    </section>
  )
}

export default ServiceSection
