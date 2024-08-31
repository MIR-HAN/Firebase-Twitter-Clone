import React from 'react'

const Content = ({tweet}) => {
  return (
    <div className='my-4'>
        {tweet.textContent && <p>{tweet.textContent}</p>}
        {tweet.imageContent && <img className='my-2 rounded-lg
        object-cover  max-h-[400px]' src={tweet.imageContent}></img>}
    </div>
  )
}

export default Content