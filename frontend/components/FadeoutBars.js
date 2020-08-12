const FadeoutBars = () => {
  return (
    <div className="hidden md:flex lg:flex h-full absolute opacity-25 left-0 right-0 justify-center">
      {Array.from(Array(12), (d, i) => i).map((el) => (
        <div
          key={el}
          className="h-full w-1/12 mx-2 lg:w-20 lg:mx-4"
          style={{
            background: 'rgb(0,0,0)',
            backgroundImage:
              'linear-gradient(180deg, rgba(54,54,54,1) 0%, rgba(255,255,255,0) 100%)',
          }}
        />
      ))}
    </div>
  )
}

export default FadeoutBars
