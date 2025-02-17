'use client'
import { ReactElement, ReactNode } from 'react'
import SideBar from './Components/SideBar'
import { useContextApp } from './contextApp'
import AllProjects from './pages/allProjects/AllProjects'
import AllTasksContainer from './pages/allTasks/AllTasks'
import ProjectWindow from './Components/Windows/ProjectWindow'
import MoreDropDown from './Components/DropDowns/MoreDropDown'
import ConfirmationWindow from './Components/Windows/ConfirmationWindow'
import { Toaster } from 'react-hot-toast'
import ProjectsDropDown from './Components/DropDowns/ProjectsDropDown'

export default function Home() {
  const {
    openSideBarObject: { openSideBar },
    sideBarMenuObject: { sideBarMenu },
    openProjectWindowObject: { openProjectWindow },
    openConfirmationWindowObject: { openConfirmationWindow },
  } = useContextApp()

  const componentMap: Record<number, ReactElement> = {
    1: <AllProjects />,
    2: <AllTasksContainer />,
  }

  const componentKey = sideBarMenu.findIndex((item) => item.isSelected)

  const selectedComponent = componentMap[componentKey + 1] || null

  return (
    <div className="flex w-full h-screen poppins">
      <Toaster />
      <ProjectsDropDown />
      <ConfirmationWindow />
      <MoreDropDown />
      <ProjectWindow />

      {(openSideBar || openProjectWindow || openConfirmationWindow) && (
        <div className={`w-full h-full ${openProjectWindow ? 'z-[70]' : 'z-50'} bg-slate-800 fixed opacity-30`}></div>
      )}

      <SideBar />

      {selectedComponent && selectedComponent}
    </div>
  )
}
