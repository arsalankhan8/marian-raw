import React from 'react'
import award1 from '../../../assets/awards/award1.webp'
import award2 from '../../../assets/awards/award2.webp'
import award3 from '../../../assets/awards/award3.webp'
import award4 from '../../../assets/awards/award4.webp'

export default function Awardlist() {
  return (
    <div className='max-w-[90vw] w-full mx-auto '>
        <div className='flex flex-wrap md:flex-nowrap md:gap-10 lg:gap-12 xl:gap-16 2xl:gap-20 pt-[30px]'>            
            <div className='flex flex-col md:gap-2 gap-4 lg:gap-3 xl:gap-4 w-full md:w-[47%]'>
                <div className="h-[460px] md:h-[280px] lg:h-[340px] xl:h-[400px] 3xl:h-[460px] w-full overflow-hidden">
                  <img src={award1} alt="award" className='h-full w-full object-cover transition-transform duration-500 hover:scale-105' />
                </div>
                <h2 className='font-unageo-bold text-[16px] md:text-[18px] lg:text-[21px] xl:text-[23px] 3xl:text-[45px] capitalize leading-[100%]'>Ontario Steel Design Award of Excellence – Projects Outside Ontario (2007)</h2>
                <p className='font-unageo text-[14px] md:text-[13px] lg:text-[14px] xl:text-[16px] 3xl:text-[26px] leading-[100%]'>Presented by the Canadian Institute of Steel Construction for the United States Air Force Memorial in Virginia, the honor acknowledged Mariani Metal’s ability to execute complex international work with accuracy and control.</p>
            </div>
             <div className='flex flex-col md:gap-2 gap-4 mt-6 md:mt-0 lg:gap-3 xl:gap-4 w-full md:w-[47%]'>
                <div className="h-[460px] md:h-[280px] lg:h-[340px] xl:h-[400px] 3xl:h-[460px] w-full overflow-hidden">
                  <img src={award2} alt="award" className='h-full w-full object-cover transition-transform duration-500 hover:scale-105' />
                </div>
                <h2 className='font-unageo-bold text-[16px] md:text-[18px] lg:text-[21px] xl:text-[23px] 3xl:text-[45px] capitalize leading-[100%]'>Ontario Steel Design Award of Excellence – Bridge Category (2019)</h2>
                <p className='font-unageo text-[14px] md:text-[13px] lg:text-[14px] xl:text-[16px] 3xl:text-[26px] leading-[100%]'>Awarded by the Canadian Institute of Steel Construction for Toronto’s Garrison Crossing, the distinction highlighted advanced fabrication of duplex stainless steel pedestrian bridges that were delivered to uncompromising standards.</p>
            </div>
            </div>
            <div className='flex flex-wrap md:flex-nowrap md:gap-10 lg:gap-12 xl:gap-16 2xl:gap-20 pt-[30px] pb-[50px]'>
            <div className='flex flex-col md:gap-2 gap-4 lg:gap-3 xl:gap-4 w-full md:w-[47%]'>
                <div className="h-[460px] md:h-[280px] lg:h-[340px] xl:h-[400px] 3xl:h-[460px] w-full overflow-hidden">
                  <img src={award3} alt="award" className='h-full w-full object-cover transition-transform duration-500 hover:scale-105' />
                </div>
                <h2 className='font-unageo-bold text-[16px] md:text-[18px] lg:text-[21px] xl:text-[23px] 3xl:text-[45px] capitalize leading-[100%]'>Canadian Consulting Engineering Award of Excellence (2020)</h2>
                <p className='font-unageo text-[14px] md:text-[13px] lg:text-[14px] xl:text-[16px] 3xl:text-[26px] leading-[100%]'>Conferred by the Association of Consulting Engineering Companies Canada for Garrison Crossing, the recognition celebrated engineering ingenuity realized through Mariani Metal’s disciplined fabrication.</p>
            </div>
            <div className='flex flex-col md:gap-2 gap-4 lg:gap-3 xl:gap-4 w-full mt-6 md:mt-0 md:w-[47%]'>
                <div className="h-[460px] md:h-[280px] lg:h-[340px] xl:h-[400px] 3xl:h-[460px] w-full overflow-hidden">
                  <img src={award4} alt="award" className='h-full w-full object-cover transition-transform duration-500 hover:scale-105' />
                </div>
                <h2 className='font-unageo-bold text-[16px] md:text-[18px] lg:text-[21px] xl:text-[23px] 3xl:text-[45px] capitalize leading-[100%]'>Top 10 Fabrication Services Providers in Canada (2024)</h2>
                <p className='font-unageo text-[14px] md:text-[13px] lg:text-[14px] xl:text-[16px] 3xl:text-[26px] leading-[100%]'>Named by Manufacturing Technology Insights as one of Canada’s leading fabrication companies, the designation reflected expertise in advanced architectural steelwork and the delivery of complex projects across North America.</p>
            </div>
        </div>
      <div className='flex flex-col justify-center items-center gap-5 pb-[60px]'>
        <p className='font-unageo-semibold-italic italic leading-[100%] text-[16px] md:text-[20px] text-center  3xl:text-[28px] text-[#00688F] w-full md:w-[50%] font-semibold'>These awards affirm Mariani Metal’s reputation as a partner capable of shaping civic and cultural landmarks through disciplined craftsmanship.</p>
        <div className='w-[30%] h-[3px] bg-[#00688F] mb-5'></div>
      </div>
    </div>
  )
}
