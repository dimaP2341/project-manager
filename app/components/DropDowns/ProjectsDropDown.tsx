import { Project } from '@/app/Data/AllProjects'
import { useContextApp } from '@/app/contextApp'
import DensitySmallOutlined from '@mui/icons-material/DensitySmallOutlined'
import React, { useEffect, useRef } from 'react'

export default function ProjectsDropDown() {
  const {
    allProjectsObject: { allProjects, setAllProjects },
    openProjectsDropDownObject: { openProjectsDropDown, setOpenProjectsDropDown },
    projectsDropDownPositionsObject: { projectsDropDownPositions },
  } = useContextApp()
  const dropDownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropDownRef.current && !dropDownRef.current.contains(event.target as Node)) {
        setOpenProjectsDropDown(false)
      }
    }

    function handleResize() {
      setOpenProjectsDropDown(false)
    }

    if (openProjectsDropDown) {
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
  }, [openProjectsDropDown])

  return (
    <div
      ref={dropDownRef}
      style={{
        top: projectsDropDownPositions.top,
        left: projectsDropDownPositions.left,
        width: projectsDropDownPositions.width,
      }}
      className={`bg-white absolute p-3 top-12 left-44 z-[90] border w-[210px] border-slate-50 select-none shadow-md rounded-lg flex flex-col gap-2 ${openProjectsDropDown ? 'block' : 'hidden'}`}
    >
      <AllProjectsItem />
      <hr className="w-[80%] text-slate-400 mx-auto my-1 opacity-55"></hr>
      <>
        {allProjects.map((singleProject) => (
          <SingleProject singleProject={singleProject} key={singleProject.id} />
        ))}
      </>
    </div>
  )
}

function AllProjectsItem() {
  const {
    chosenProjectObject: { chosenProject, setChosenProject },
    openProjectsDropDownObject: { setOpenProjectsDropDown },
  } = useContextApp()
  return (
    <div
      onClick={() => {
        setChosenProject(null)
        setOpenProjectsDropDown(false)
      }}
      className="flex items-center justify-center gap-7 p-2 rounded-lg text-slate-600 cursor-pointer"
    >
      <div className="flex gap-2 items-center justify-center">
        <span className="text-[14px] mt-1 hover:text-royal-blue-600 cursor-pointer">All Projects</span>
      </div>
    </div>
  )
}

function SingleProject({ singleProject }: { singleProject: Project }) {
  const {
    chosenProjectObject: { chosenProject, setChosenProject },
    allProjectsObject: { allProjects },
    openProjectsDropDownObject: { setOpenProjectsDropDown },
  } = useContextApp()

  function handleTheProjectClicked(projectId: string) {
    const findProject = allProjects.find((project) => project.id === projectId)

    if (findProject) {
      setChosenProject(findProject)
    }

    setOpenProjectsDropDown(false)
  }

  return (
    <div
      onClick={() => handleTheProjectClicked(singleProject.id)}
      className={`flex items-center justify-start gap-7 p-2 rounded-lg text-slate-600 cursor-pointer ${chosenProject?.id === singleProject.id && 'border border-royal-blue-600 bg-royal-blue-50'}`}
    >
      <div className="flex gap-2 items-center">
        {' '}
        {/* {getIconComponent(singleProject.icon, "text-orange-600", "22px")}{" "} */}
      </div>
      <span className="text-[13px] mt-1 hover:text-royal-blue-600 cursor-pointer">{singleProject.title}</span>
    </div>
  )
}
