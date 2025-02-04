import { useContextApp } from '@/app/contextApp'
import React from 'react'

export default function SortingDropDown() {
    const {sortingOptionObject: {sortingOptions, setSortingOptions}} = useContextApp()
  return (
    <div className='bg-white text-sm top-[226px] right-60 z-[60] px-5 border-slate-50 fixed py-6 w-[160px] select-none shadow-md rounded-lg flex flex-col'>
      {sortingOptions.map((category, categoryIndex) => (
        <div key={categoryIndex} className='flex flex-col gap-1 text-slate-700 cursor-pointer'>
            <span className={`text-[13px] font-bold ${category.category === "Date" ? "mt-5" : ""}`}>
                {category.category}
            </span>

            <div className='flex flex-col gap-2 ml-2 mt-[5px]'>
                {category.options.map((option, optionIndex) => (
                    <div key={optionIndex}>
                        <span className={`${option.selected ? "text-orange-600" : "text-slate-500"} cursor-pointer hover:text-orange-600`}>{option.label}</span>
                    </div>
                ))}
            </div>
        </div>
      ))}
    </div>
  )
}
