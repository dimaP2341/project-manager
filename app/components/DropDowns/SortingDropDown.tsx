import { Task } from '@/app/Data/AllProjects'
import { sortProjects } from '@/app/Functions/sortingFunctions'
import { useContextApp } from '@/app/contextApp'
import React, { useCallback, useEffect, useRef } from 'react'

export default function SortingDropDown() {
  const {
    allProjectsObject: { allProjects, setAllProjects },
    sideBarMenuObject: { sideBarMenu },
    allTasksObject: { allTasks, setAllTasks },
    openSortingDropDownObject: { openSortingDropDown, setOpenSortingDropDown },
    sortingOptionsProjectObject: { sortingOptionsProject, setSortingOptionsProject },
    sortingOptionsTaskObject: {sortingOptionsTask, setSortingOptionsTask},
    sortingDropDownPositionsObject: { sortingDropDownPositions },
  } = useContextApp()

  const dropDownRef = useRef<HTMLDivElement>(null)

  const sortingOptionArray = sideBarMenu[0].isSelected ? sorting

  const sortAllProjects = useCallback(() => {
    const currentSortingOption = sortingOptionsProject
      .flatMap((category) => category.options)
      .flat((option) => option.selected)
    const selectedOption = currentSortingOption
    return sortProjects(allProjects, selectedOption?.value)
  }, [allProjects])

  function sortAllTasks(allTasks: Task[], SelectionOptionValue: string | undefined) {
    const sortedTasks = [...allTasks]

    switch (SelectionOptionValue) {
      case 'asc':
        sortedTasks.sort((a, b) => a.title.localeCompare(b.title))
        break
      case 'desc':
        sortedTasks.sort((a, b) => b.title.localeCompare(a.title))
        break
      case 'newest':
        sortedTasks.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        break
      case 'oldest':
        sortedTasks.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
      default:
        return allTasks
    }

    return sortedTasks
  }

  useEffect(() => {
    const currentSortingOption = sortingOptionsProject
      .flatMap((category) => category.options)
      .find((option) => option.selected)
    const selectedOption = currentSortingOption

    const sortedProjects = sortAllProjects(allProjects, selectedOption?.value)
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
      document.addEventListener('mousedown', handleClickOutside)
      window.addEventListener('resize', handleResize)
    } else {
      document.removeEventListener('mousedown', handleClickOutside)
      window.removeEventListener('resize', handleResize)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      window.removeEventListener('resize', handleResize)
    }
  }, [openSortingDropDown, setOpenSortingDropDown])

  function handleOptionSelected(categoryIndex: number, optionIndex: number) {
    const updateSortingOptions = sortingOptionArray.map((category, cIndex) => ({
      ...category,
      options: category.options.map((option, oIndex) => ({
        ...option,
        selected: cIndex === categoryIndex && oIndex === optionIndex,
      })),
    }))

    const selectedOption = updateSortingOptions.flatMap((option) => option.options).find((option) => option.selected)

    if (sideBarMenu[0].isSelected) {
      const allSortedProjects = sortProjects(allProjects, selectedOption.value)
      setAllProjects(allSortedProjects)
      setSortingOptionsProject(updateSortingOptions)
    } else if (sideBarMenu[1].isSelected) {
      const sortedTasks = sortAllTasks(allTasks, selectedOption.value)
      setAllTasks(sortedTasks)
      setSortingOptionsTask(updateSortingOptions)
    }
    setOpenSortingDropDown(false)
  }

  useEffect(() => {
    const currentSortingOption = sortingOptionsTask
      .flatMap((category) => category.options)
      .find((option) => option.selected)

    const selectedOption = currentSortingOption

    const sortedTasks = sortAllTasks(allTasks, selectedOption?.value)
    if (JSON.stringify(sortedTasks) !== JSON.stringify(allTasks)) {
      setAllTasks(sortedTasks)
    }
  }, [allTasks])

  return (
    <div
      ref={dropDownRef}
      style={{
        top: `${sortingDropDownPositions.top}px`,
        left: `${sortingDropDownPositions.left}px`,
        width: `${sortingDropDownPositions.width}`,
      }}
      className={`bg-white text-sm top-[226px] right-60 z-[60] px-5 border-slate-50 fixed py-6 w-[160px] select-none shadow-md rounded-lg flex flex-col ${openSortingDropDown ? 'block' : 'hidden'}`}
    >
      {sortingOptionArray.map((category, categoryIndex) => (
        <div key={categoryIndex} className="flex flex-col gap-1 text-slate-700 cursor-pointer">
          <span className={`text-[13px] font-bold ${category.category === 'Date' ? 'mt-5' : ''}`}>
            {category.category}
          </span>

          <div className="flex flex-col gap-2 ml-2 mt-[5px]">
            {category.options.map((option, optionIndex) => (
              <div key={optionIndex}>
                <span
                  onClick={() => handleOptionSelected(categoryIndex, optionIndex)}
                  className={`${option.selected ? 'text-orange-600' : 'text-slate-500'} cursor-pointer hover:text-orange-600`}
                >
                  {option.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
