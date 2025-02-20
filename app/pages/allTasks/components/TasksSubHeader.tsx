import { Task } from '@/app/Data/AllProjects'
import { useContextApp } from '@/app/contextApp'
import KeyboardArrowDownOutlined from '@mui/icons-material/KeyboardArrowDownOutlined'
import KeyboardArrowUpOutlined from '@mui/icons-material/KeyboardArrowUpOutlined'
import SplitscreenOutlined from '@mui/icons-material/SplitscreenOutlined'
import React, { useRef } from 'react'

export default function TasksSubHeader() {
  return (
    <div className="mt-24 flex justify-between items-center">
      <MyProjectsText />
      <SortByButton />
    </div>
  )
}

function MyProjectsText() {
  const {
    chosenProjectObject: { chosenProject },
    allProjectsObject: { allProjects },
    projectsDropDownPositionsObject: { setProjectsDropDownPositions },
    openProjectsDropDownObject: { openProjectsDropDown, setOpenProjectsDropDown },
  } = useContextApp()

  function allTasksInAllProjects() {
    return allProjects.reduce((acc, project) => acc + project.tasks.length, 0)
  }

  function calculateCompletedTasks(tasks: Task[]) {
    return tasks.filter((task) => task.status === 'Completed').length
  }

  const totalTasks = chosenProject ? chosenProject.tasks.length : allTasksInAllProjects()

  const completedTasks = chosenProject
    ? calculateCompletedTasks(chosenProject.tasks)
    : allProjects.reduce((acc, project) => acc + calculateCompletedTasks(project.tasks), 0)

  const completionPercentage = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0

  const projectTitleRef = useRef<HTMLDivElement>(null)

  function openTheProjectDropDown() {
    if (projectTitleRef.current) {
      const rect = projectTitleRef.current.getBoundingClientRect()
      const { top, left, width } = rect
      setProjectsDropDownPositions({ left, top: top + 40, width: width + 80 })
    }
    setOpenProjectsDropDown(!openProjectsDropDown)
  }

  return (
    <div className="flex items-center gap-3 max-sm:gap-2">
      <div className="w-[41px] -mt-1 flex justify-center items-center h-[44px] rounded-md bg-royal-blue-100">
        <SplitscreenOutlined sx={{ fontSize: '21px' }} className="text-royal-blue-600" />
      </div>
      <ul className="flex flex-col gap-[7px] max-sm:gap-[10px]">
        <li className="text-[17px] font-semibold flex gap-2 items-center">
          <div
            className="text-slate-700 flex gap-2 items-center"
            ref={projectTitleRef}
            onClick={openTheProjectDropDown}
          >
            <span className="text-lg">{chosenProject?.title || 'All Projects'}</span>
            <span className="bg-slate-700 text-white text-[14px] p-[2px] px-2 rounded-md max-[420px]:hidden">
              {totalTasks}
            </span>
          </div>
          <KeyboardArrowDownOutlined className="text-slate-600 text-lg" />
        </li>
        <div className="flex gap-1 items-center">
          <li className="text-[12px] h-[4px] w-[280px] bg-slate-200 rounded-md overflow-auto max-sm:w-[170px] max-[420px]:w-[130px]">
            <div
              className="w-1/2 h-[100%] bg-royal-blue-600 rounded-r-xl"
              style={{ width: `${completionPercentage}%` }}
            ></div>
          </li>
          <p className="text-[12px] text-slate-400 ml-3 max-sm:hidden">{completionPercentage.toFixed(0)}% Completed</p>
        </div>
      </ul>
    </div>
  )
}

function SortByButton() {
  const {
    sortingDropDownPositionsObject: { setSortingDropDownPositions },
    openSortingDropDownObject: { openSortingDropDown, setOpenSortingDropDown },
    sortingOptionsTaskObject: { sortingOptionsTask },
  } = useContextApp()

  const sortRef = useRef<HTMLDivElement>(null)

  let sortingLabel = ''

  const flatten = sortingOptionsTask.flatMap((option) => option.options).find((option) => option.selected)

  if (flatten) {
    if (flatten.label === 'A-Z' || flatten.label === 'Z-A') {
      sortingLabel = `Order ${flatten.label}`
    } else {
      sortingLabel = `${flatten.label} Tasks`
    }
  }

  function openTheSortingDropDown() {
    if (sortRef.current) {
      const rect = sortRef.current.getBoundingClientRect()
      const { top, left, width } = rect
      setSortingDropDownPositions({ left, top: top + 30, width })
      setOpenSortingDropDown(true)
    }
  }

  return (
    <div
      ref={sortRef}
      className="flex text-[15px] font-semibold gap-3 max-sm:flex-col max-sm:gap-1 hover:cursor-pointer hover:text-royal-blue-600 text-slate-800"
    >
      <span className="text-slate-300">Sort By</span>
      <div onClick={openTheSortingDropDown} className="flex items-center cursor-pointer">
        <span className="text-slate-800">{sortingLabel}</span>
        {openSortingDropDown ? (
          <KeyboardArrowUpOutlined sx={{ fontSize: '19px' }} />
        ) : (
          <KeyboardArrowDownOutlined sx={{ fontSize: '19px' }} />
        )}
      </div>
    </div>
  )
}
