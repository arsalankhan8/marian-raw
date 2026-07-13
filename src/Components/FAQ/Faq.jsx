import React, { useState } from 'react'
import down from '../../assets/down.png'

export default function Faq({ faqtitle, faqsubtitle, faqdescription }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="rounded-4xl p-[15px] 3xl:p-[30px] flex flex-col gap-4 shadow-md">
      <div className="flex justify-between gap-4 items-start">
        <div className="flex flex-col">
          <p className="font-unageo-bold text-[14px] md:text-[16px] lg:text-[18px] xl:text-[19px] 3xl:text-[31px] text-left capitalize leading-[112%]">
            {faqtitle}
          </p>
          <p className="font-unageo text-[12px] md:text-[13px] lg:text-[14px] xl:text-[15px] 3xl:text-[20px] text-left capitalize leading-[112%]">
            {faqsubtitle}
          </p>
        </div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`transition-transform duration-300 ${
            isOpen ? 'rotate-180' : 'rotate-0'
          }`}
        >
          <img src={down} alt="down arrow"  />
        </button>
      </div>

      {/* Description with smooth expand/collapse */}
      <div
        className={`overflow-hidden transition-[max-height,opacity] duration-500 ease-in-out ${
          isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <p className="font-unageo border-t-[1px] border-t-black pt-4 text-[12px] md:text-[13px] lg:text-[14px] xl:text-[15px] 3xl:text-[20px] leading-[140%] mt-2">
          {faqdescription}
        </p>
      </div>
    </div>
  )
}
