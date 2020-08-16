import { useState } from 'react'
import { useRouter } from 'next/router'
import moment from 'moment-timezone'

import { parseUrl } from '@/lib/helpers'
import useInterval from 'hooks/useInterval'
import Logo from './Logo'
import { disableMaintenanceMode } from '@/lib/api'

const Maintenance = ({ date, image }) => {
  const router = useRouter()

  const [days, setDays] = useState('00')
  const [hours, setHours] = useState('00')
  const [minutes, setMinutes] = useState('00')
  const [seconds, setSeconds] = useState('00')

  const eventTime = moment.tz(moment(date).subtract(1, 'h'), 'Europe/Madrid')
  const currentTime = moment.tz()
  let duration = moment.duration(eventTime.diff(currentTime))

  useInterval(() => {
    duration = moment.duration(duration - 1000, 'milliseconds')

    setDays(duration.days())
    setHours(duration.hours())
    setMinutes(duration.minutes())
    setSeconds(duration.seconds())

    if (duration.asSeconds() <= 0) {
      disableMaintenanceMode()
      router.push('/')
    }
  }, 1000)

  return (
    <div className="w-screen h-screen bg-image">
      <div className="h-full bg-black bg-opacity-50">
        <div className="container mx-auto h-full">
          <div className="h-full flex flex-col justify-center items-center">
            <div className="w-16 lg:w-20 mb-8">
              <Logo />
            </div>
            <time
              dateTime={date}
              className="text-4xl md:text-8xl lg:text-9xl font-bold font-display block my-4 lg:my-10 tracking-widest text-center"
            >
              <div className="md:w-32 lg:w-40 mx-4 lg:mx-6 inline-block">
                {days}
                <span className="block text-xs md:text-base lg:text-base uppercase tracking-wider font-normal">
                  Days
                </span>
              </div>

              <div className="md:w-32 lg:w-40 mx-4 lg:mx-6 inline-block">
                {hours}
                <span className="block text-xs md:text-base lg:text-base uppercase tracking-wider font-normal">
                  Hours
                </span>
              </div>

              <div className="md:w-32 lg:w-40 mx-4 lg:mx-6 inline-block">
                {minutes}
                <span className="block text-xs md:text-base lg:text-base uppercase tracking-wider font-normal">
                  Minutes
                </span>
              </div>

              <div className="md:w-32 lg:w-40 mx-4 lg:mx-6 inline-block">
                {seconds}
                <span className="block text-xs md:text-base lg:text-base uppercase tracking-wider font-normal">
                  Seconds
                </span>
              </div>
            </time>

            <h2 className="text-base mt-12 md:mt-16 lg:mt-20 md:text-lg lg:text-3xl font-display uppercase tracking-widest">
              Coming Soon
            </h2>
          </div>
        </div>
      </div>

      <style jsx>
        {`
          body {
            background-color: #000;
          }

          .bg-image {
            background-image: url(${parseUrl(image)});
            background-size: cover;
            background-repeat: no-repeat;
            background-position: center center;
          }
        `}
      </style>
    </div>
  )
}

export default Maintenance
