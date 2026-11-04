import React from 'react'
import Newslist from '../Newslist/Newslist'
import blogData from '../../../data/blogdata.json'
import Newslatest from '../Newslatest/Newslatest'
import Newstabs from '../Newstabs/Newstabs'

export default function Newssection() {
  return (
    <div>
      <div className='mx-auto flex w-full max-w-[92vw] flex-col gap-8 lg:flex-row lg:items-start lg:justify-between'>
        <div className='flex w-full flex-wrap justify-between gap-8 lg:w-[65%] lg:border-r-[1px] lg:pr-[30px]'>
          {blogData.map((value, index) => (
            <Newslist 
              key={index} 
              title={value.title} 
              description={value.description} 
              img={value.img} 
            />
          ))}
        </div>

        <aside className='flex w-full min-w-0 flex-col gap-4 lg:w-[30%]'>
          <h3 className='text-left font-unageo-bold text-[20px] tracking-[-0.06em] text-[#00688F] lg:text-[30px] xl:text-[45px] 2xl:text-[55px] 4k:text-[111px]'>
            Latest
          </h3>
          {blogData.slice(0, 4).map((value, index) => (
            <Newslatest 
              key={index} 
              slug={value.slug} 
              title={value.title} 
              description={
                value.description.length > 50 
                  ? value.description.substring(0, 50) + "..." 
                  : value.description
              } 
              img={value.img} 
            />
          ))}
          <Newstabs blogdata={blogData}/>
          
        </aside>
      </div>
    </div>
  )
}
