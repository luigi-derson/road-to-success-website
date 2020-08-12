import LikeIcon from '@/components/icons'
import CommentIcon from '@/components/icons'

const InstaCard = ({ picture, caption, likes, comments, href }) => {
  const truncateCaption = (text) => `${text.substring(0, 60)}...`

  return (
    <a
      className="group inline-block p-4 w-full md:w-1/2 lg:w-1/4 h-full"
      href={href}
      data-aos="fade-up"
      data-aos-once="true"
    >
      <div className="relative overflow-hidden pt-full">
        <img
          className="h-full object-cover absolute top-0 transition-transform duration-300 ease-linear transform group-hover:scale-110"
          src={picture}
          alt="Instagram post"
        />
        <div className="absolute top-0 left-0 h-full w-full bg-black opacity-0 group-hover:opacity-85 transition ease-in duration-200">
          <div className="h-full flex flex-col items-center justify-center">
            <p className="mb-5 w-48 transform translate-y-40 group-hover:translate-y-0 transition ease-in duration-300">
              {truncateCaption(caption)}
            </p>
            {/* <div className="flex items-center">
              <span className="px-4">
                <LikeIcon />
                {likes}
              </span>
              <span className="px-4">
                <CommentIcon />
                {comments}
              </span>
            </div> */}
          </div>
        </div>
      </div>
    </a>
  )
}

export default InstaCard
