import React from 'react'

export default function Bannerimage({ image, mobileimg }) {
  return (
    <div className='max-w-[90vw] w-full mx-auto h-[480px] md:h-[50vh] 3xl:h-[480px] overflow-hidden'>
      <picture className='block h-full w-full'>
        <source media="(min-width: 768px)" srcSet={image} />
        <img
          src={mobileimg}
          alt="banner"
          loading="eager"
          decoding="async"
          fetchPriority="high"
          className='block w-full h-full object-cover'
        />
      </picture>
    </div>
  )
}
