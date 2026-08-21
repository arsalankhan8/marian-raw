import React from 'react'

export default function Newslist({slug, img, title, description, link}) {
  return (
    <div className='bg-[#00688F] text-white flex flex-col gap-5 md:w-[46%] lg:w-[47%] xl:w-[47%] 2xl:w-[48%] pb-[20px]'>
        <div className="lg:h-[286px] xl:h-[296px] 2xl:h-[346px] w-full overflow-hidden">
          <img 
            src={img} 
            alt="blog image" 
            className='h-full w-full object-cover transition-transform duration-500 hover:scale-105' 
          />
        </div>

        <div className='flex flex-col pl-[25px] pr-[15px] gap-4 '>
          <h3 className='font-unageo-bold text-[16px] md:text-[22px] 3xl:text-[31px] capitalize leading-[94%]'>{title}</h3>
          <p className='font-unageo text-[13px] 3xl:text-[17px] capitalize leading-[132%]'>{description}</p>
          <button className='font-unageo-bold text-[16px] md:text-[17px] 3xl:text-[21px] capitalize underline w-fit'>Read More</button>
        </div>
        
    </div>
  )
}
