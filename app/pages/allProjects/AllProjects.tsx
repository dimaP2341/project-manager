import React from 'react'
import ProjectsHeader from './components/ProjectsHeader'
import ProjectsSubHeader from './components/ProjectsSubHeader'
import AllProjectsSection from './components/AllProjectsSection'
import StatsRightSideBar from './components/StatsRightSideBar'
import { useContextApp } from '@/app/contextApp'

export default function AllProjects() {
  const {
    closeRightSideBarObject: { closeRightSideBar },
  } = useContextApp()

  return (
    <div className="bg-slate-50 w-full flex-grow overflow-auto flex">
      <AllProjectsArea />
      {closeRightSideBar && <StatsRightSideBar />}
    </div>
  )
}

function AllProjectsArea() {
  return (
    <div className="w-full max-lg:w-full p-10 max-sm:p-7 max-sm:pt-9 flex flex-col gap-3 border">
      <ProjectsHeader />
      <ProjectsSubHeader />
      <AllProjectsSection />
    </div>
  )
}
