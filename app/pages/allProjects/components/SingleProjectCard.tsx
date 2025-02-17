import { Project } from '@/app/Data/AllProjects'
import { useContextApp } from '@/app/contextApp'
import CircleRounded from '@mui/icons-material/CircleRounded'
import MoreVertOutlined from '@mui/icons-material/MoreVertOutlined'
import SplitscreenOutlined from '@mui/icons-material/SplitscreenOutlined'
import React, { useRef } from 'react'

export default function SingleProjectCard({ project }: { project: Project }) {
  const daysLeft = calculateDaysLeft(project.createdAt)
  const progressPercentage = calculateProgressPercentage(
    project.tasks.length,
    project.tasks.filter((task) => task.status === 'Completed').length,
  )

  return (
    <li className="w-[350px] max-md:w-[96%] h-[306px] flex flex-col gap-8 border rounded-lg p-7 bg-white">
      <ProjectCardHeader project={project} dayLeft={daysLeft} />
      <ProjectCardBody project={project} />
      <ProjectCardFooter progressPercentage={progressPercentage} />
    </li>
  )
}

function ProjectCardHeader({ project, daysLeft }: { project: Project; daysLeft: number }) {
  const threeDotsRef = useRef<HTMLDivElement | null>(null)
  const {
    dropDownPositionObject: { setDropDownPositions },
    openDropDownObject: { setOpenDropDown },
    selectedProjectObject: { setSelectedProject },
    sideBarMenuObject: { setSideBarMenu },
  } = useContextApp()

  function openDropDown(e: MouseEvent) {
    e.preventDefault()
    e.stopPropagation()
    if (threeDotsRef.current) {
      const rect = threeDotsRef.current.getBoundingClientRect()
      const { top, left } = rect
      setDropDownPositions({
        top: top + window.screenY - 45,
        left: left + window.screenX + 10,
      })

      setOpenDropDown(true)
      setSelectedProject(project)
    }
  }

  function showAllTasksOfProject() {
    setChosenProject(project)
    setSideBarMenu((prevState) =>
      prevState.map((item) => ({
        ...item,
        isSelected: item.id === 2 ? true : false,
      })),
    )
  }
  return (
    <div className="flex justify-between items-center">
      <div className="flex gap-3 items-center">
        <div className="bg-royal-blue-600 flex justify-center items-center w-[38px] h-[38px] rounded-md">
          <SplitscreenOutlined className="text-white text-xl" />
        </div>
        <div className="flex flex-col">
          <span className="font-semibold text-[19px]">{trancateString(project.title, 25)}</span>
          <span className="text-slate-400 text-[13px]">
            {daysLeft === 0 ? 'Today' : daysLeft + ` day${daysLeft > 1 ? 's' : ''} ago`}
          </span>
        </div>
      </div>
      <div
        ref={threeDotsRef}
        onClick={openDropDown}
        className="w-6 h-6 flex justify-center items-center rounded-full hover:bg-slate-100"
      >
        <MoreVertOutlined className="text-slate-400 text-[19px] cursor-pointer" />
      </div>
    </div>
  )
}

function ProjectCardBody({ project }: { project: Project }) {
  const {
    openTasksWindowObject: { setOpenTasksWindow },
    projectClickedObject: { setProjectClicked },
    allProjectsObject: { allProjects, setAllProjects },
  } = useContextApp()
  function openTheTaskWindow() {
    setOpenTasksWindow(true)

    const findProject = allProjects.find((proj) => proj.title.toLowerCase() === project.title.toLowerCase())

    if (findProject) {
      setProjectClicked(findProject)
    }
  }
  return (
    <div className="h-[80px] flex flex-col gap-3 mb-1">
      <ul className="text-slate-400 text-[13px] flex flex-col gap-2 ml-3">
        <li className="flex flex-col gap-2 items-start">
          {project.tasks.slice(0, 3).map((task) => (
            <div key={task.id} className="flex gap-2 items-center">
              <CircleRounded sx={{ fontSize: '14px' }} />
              <span>{trancateString(task.title, 40)}</span>
            </div>
          ))}
        </li>
      </ul>

      <div className="text-[11px] text-slate-400">
        {project.tasks.length > 3 && <span className="text-royal-blue-600">+{project.tasks.length - 3}</span>}
      </div>
    </div>
  )
}

function ProjectCardFooter() {
  return (
    <div className="flex gap-4 flex-col mt-2">
      <div className="text-[12px] gap-3 items-center flex overflow-hidden">
        <div className="w-full h-[7px] rounded-xl bg-slate-100 overflow-hidden">
          <div className="w-1/2 bg-royal-blue-600 h-full rounded-r-xl"></div>
        </div>
      </div>
      <div className="flex justify-between">
        <p className="text-[13px] text-slate-400">On progress</p>
        <div className="flex gap-1 text-[13px]">78%</div>
      </div>
    </div>
  )
}

function trancateString(str: string, maxLength: number) {
  if (str.length > maxLength) {
    return str.slice(0, maxLength) + '...'
  }

  return str
}

function calculateDaysLeft(creationDate: string): number {
  const creation = new Date(creationDate)
  const now = new Date()
  const differenceInTime = now.getTime() - creation.getTime()
  return Math.floor(differenceInTime / (1000 * 3600 * 24))
}

function calculateProgressPercentage(totalTasks: number, completedTasks: number) {
  return totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0
}
