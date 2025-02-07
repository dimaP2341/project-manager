import { Project } from '@/app/Data/AllProjects'
import { useContextApp } from '@/app/contextApp'
import DensitySmallOutlined from '@mui/icons-material/DensitySmallOutlined'
import React, { useEffect, useRef } from 'react'

export default function ProjectsDropDown() {
    const {
        allProjectsObject: {allProjects, setAllProjects},
        openProjectsDropDownObject: {openProjectsDropDown, setOpenProjectsDropDown},
        projectsDropDownPositionsObject: {projectsDropDownPositions}
    } = useContextApp()
    const dropDownRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if(dropDownRef.current && !dropDownRef.current.contains(event.target as Node)) {
                setOpenProjectsDropDown(false)
            }
        }

        function handleResize() {
            setOpenProjectsDropDown(false)
        }

        if (openProjectsDropDown) {
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
        
    }, [openProjectsDropDown])


  return (
    <div ref={dropDownRef} className={`bg-white absolute p-3 top-12 left-44 z-[90] border w-[210px] border-slate-50 select-none shadow-md rounded-lg flex flex-col gap-2`}>
        <AllProjectsItem />
       <hr className='w-[80%] text-slate-400 mx-auto my-1 opacity-55'></hr>
       <>
         {allProjects.map((singleProject) => (
            <SingleProject singleProject={singleProject} key={singleProject.id} />
         ))}
       </>      
    </div>
  )
}

function AllProjectsItem() {
    return (
        <div className='flex items-center justify-between gap-7 p-2 rounded-lg text-slate-600 cursor-pointer'>
            <div className='flex gap-2 items-center'>
                <div>
                    <DensitySmallOutlined className='text-orange-600 text-[22px]' />
                </div>
                <span className='text-[13px] mt-1 hover:text-orange-600 cursor-pointer'>All Projects</span>
            </div>
        </div>
    )
}

function SingleProject({singleProject}: {singleProject: Project}) {
    return (
        <div className={`flex items-center justify-between gap-7 p-2 rounded-lg text-slate-600 cursor-pointer`}>
            <div className='flex gap-2 items-center'>
                {" "}
                {getIconComponent(singleProject.icon, "text-orange-600", "22px")}{" "}
            </div>
            <span className='text-[13px] mt-1 hover:text-orange-600 cursor-pointer'>{singleProject.title}</span>
        </div>
    )
}