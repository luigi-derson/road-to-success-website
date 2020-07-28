const FadeoutBars = () => {
  return (
    <div className="h-full absolute flex opacity-25 left-0 right-0 justify-center">
      {Array.from(Array(12), (d, i) => i).map((el) => (
        <div
          key={el}
          className="h-full w-20 mx-4"
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
