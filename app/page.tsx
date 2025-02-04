'use client'
import { ReactElement, ReactNode } from 'react'
import SideBar from './components/SideBar'
import { useContextApp } from './contextApp'
import AllProjects from './pages/allProjects/AllProjects'
import AllTasksContainer from './pages/allTasks/AllTasks'
import ProjectWindow from './components/Windows/ProjectWindow'
import MoreDropDown from './components/DropDowns/MoreDropDown'
import ConfirmationWindow from './components/Windows/ConfirmationWindow'

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
