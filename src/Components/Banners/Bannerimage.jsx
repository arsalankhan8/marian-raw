import React from 'react'

export default function Bannerimage({ image, mobileimg }) {
  return (
    <div className='max-w-[90vw] w-full mx-auto h-[480px] md:h-[50vh] 3xl:h-[480px] overflow-hidden'>
      {/* Desktop Image */}
      <img
        src={image}
        alt="banner"
        className='hidden md:block w-full h-full object-cover'
      />
      
      {/* Mobile Image */}
      <img
        src={mobileimg}
        alt="banner"
        className='block md:hidden w-full h-full object-cover'
      />
    </div>
  )
}
