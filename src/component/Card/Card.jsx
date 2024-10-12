const Card = ({ imgUrl, text, bcolor,color, imgRadius, quotes }) => {
 

  return (
    <figure
      className={`rounded-3xl p-8 border-solid border-4 font-nunito bg-[${bcolor}] text-${color}-900 border-${color}-500 `}
    >
      
      <img
        className={`w-30 h-30 mx-auto ${imgRadius}`}
        src={imgUrl}
        alt=""
        width="auto"
        height="auto"
      />
      <div className="pt-6 text-center space-y-4">
        <blockquote>
          <p className="text-lg font-light antialiased">
            {quotes ? (
              <>
                <span className="text-5xl">“</span>
                {text}
                <span className="text-5xl inline-block w-full justify-end text-right">
                  ”
                </span>
              </>
            ) : (
              text
            )}
          </p>
        </blockquote>
      </div>
    
    </figure >
  )
}

export default Card
