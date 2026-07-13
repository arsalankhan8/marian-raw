import React from 'react'

export default function Portfolioheading({heading, subtext}) {
  return (
    <div className='flex flex-col gap-3'>
                <p className='font-unageo-semibold text-[15px] 3xl:text-[26px] leading-[100%] text-[#939598]'>{heading}:</p>
                <p className='font-unageo-medium text-[14px] lg:text-[15px] 3xl:text-[24px] leading-[100%]'>{subtext}</p>
            </div>
  )
}
