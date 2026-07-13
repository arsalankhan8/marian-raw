import React from 'react'

export default function SingleHeading({heading, headingcss, divcss}) {
  return (
    <div className={`flex  pb-[25px] ${divcss}`}>
        <span className={`text-[20px] lg:text-[30px] xl:text-[45px] 2xl:text-[55px] 3xl:text-[111px] text-[#00688F] font-counture uppercase ${headingcss}`}>{heading}</span>
      
    </div>
  )
}
