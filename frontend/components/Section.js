const Section = ({ title, children, sectionStyle = '', backgroundImage }) => (
  <section
    className={`py-10 ${sectionStyle}`}
    style={{
      backgroundImage: `url(${backgroundImage})`,
    }}
  >
    {title && (
      <h2 className="mt-4 mb-6 text-xl uppercase text-center font-display">
        {title}
      </h2>
    )}
    <div className="container mx-auto px-8">{children}</div>
  </section>
)

export default Section
