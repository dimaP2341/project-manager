import { sortProjects } from '@/app/Functions/sortingFunctions'
import { useContextApp } from '@/app/contextApp'
import React, { useCallback, useEffect, useRef } from 'react'

export default function SortingDropDown() {
    const {
    allProjectsObject: {allProjects},
    openSortingDropDownObject: {openSortingDropDown, setOpenSortingDropDown}, 
    sortingOptionObject: {sortingOptions, setSortingOptions},
    sortingDropDownPositionsObject: {sortingDropDownPositions},
  } = useContextApp()
  
    const dropDownRef = useRef<HTMLDivElement>(null)

    const sortAllProjects = useCallback(() => {
      const currentSortingOption = sortingOptions.flatMap((category) => category.options).flat((option) => option.selected);
      const selectedOption = currentSortingOption
      return sortProjects(allProjects, selectedOption?.value)
    }, [allProjects])

    useEffect(() => {
      const sortedProjects = sortAllProjects()
      if (JSON.stringify(sortedProjects) !== JSON.stringify(allProjects)) {
        setAllProjects(sortedProjects)
      }
    }, [allProjects])

    useEffect(() => {
      function handleClickOutside(e: MouseEvent) {
        if (dropDownRef.current && !dropDownRef.current.contains(e.target as Node)) {
          setOpenSortingDropDown(false)
        }
      }

      function handleResize() {
        setOpenSortingDropDown(false)
      }

      if (openSortingDropDown) {
        document.addEventListener("mousedown", handleClickOutside)
        window.addEventListener("resize", handleResize)
      } else {
        document.removeEventListener("mousedown", handleClickOutside)
        window.removeEventListener("resize", handleResize)
      }

      return () => {
        document.removeEventListener("mousedown", handleClickOutside)
        window.removeEventListener("resize", handleResize)
      }
    }, [openSortingDropDown, setOpenSortingDropDown])

    function handleOptionSelected(categoryIndex: number, optionIndex: number) {
      const updateSortingOptions = sortingOptions.map((category, cIndex) => ({
        ...category, 
        options: category.options.map((option, oIndex) => ({
          ...option,
          selected: cIndex === categoryIndex && oIndex === optionIndex
        })) 
      }))

      const selectedOption = updateSortingOptions.flatMap((option) => option.options).find((option) => option.selected)

      console.log(selectedOption)

      setSortingOptions(updateSortingOptions)
      setAllProjects(allSortedProjects)
    }

    return (
    <div ref={dropDownRef} style={{top: `${sortingDropDownPositions.top}px`, left: `${sortingDropDownPositions.left}px`, width: `${sortingDropDownPositions.width}`}} className={`bg-white text-sm top-[226px] right-60 z-[60] px-5 border-slate-50 fixed py-6 w-[160px] select-none shadow-md rounded-lg flex flex-col ${openSortingDropDown ? "block" : "hidden"}`}>
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
