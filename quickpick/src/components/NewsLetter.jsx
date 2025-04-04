import React from 'react'

const NewsLetter = () => {
  return (
    <div className='text-center'>
        <p className='text-2xl font-medium text-gray-800'>Subscribe now & get 20% off</p>
        <p className='text-xs sm:text-sm text-gray-400 mt-3'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis cupiditate odit laborum quibusdam blanditiis voluptates.</p>
        <form onSubmit={(e) => e.preventDefault()}  className='w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border pl-3'>
            <input type="email" placeholder='Enter Your Email' className='w-full sm:flex-1 outline-none' required />
            <button className='bg-black text-white text-sm px-8 py-4 hover:shadow-xl'>Subscribe</button>
        </form>
    </div>
  )
}

export default NewsLetter
