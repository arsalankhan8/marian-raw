import React from 'react'
import Newslist from '../Newslist/Newslist'
import blogData from '../../../data/blogdata.json'
import Newslatest from '../Newslatest/Newslatest'
import Newstabs from '../Newstabs/Newstabs'

export default function Newssection() {
  return (
    <div>
      <div className='flex max-w-[92vw] w-full mx-auto justify-center gap-8 flex-wrap '>
        <div className='flex flex-wrap gap-8 md:w-full lg:w-[65%] justify-between md:pr-[30px] md:border-r-[1px]'>
          {blogData.map((value, index) => (
            <Newslist 
              key={index} 
              slug={value.slug} 
              title={value.title} 
              description={value.description} 
              img={value.img} 
            />
          ))}
        </div>

        <div className='lg:w-[30%] flex flex-col gap-4'>
          <h3 className='font-unageo-bold text-[20px] lg:text-[30px] xl:text-[45px] 2xl:text-[55px] 3xl:text-[111px] text-[#00688F] tracking-[-6%]'>
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
          
        </div>
      </div>
    </div>
  )
}
