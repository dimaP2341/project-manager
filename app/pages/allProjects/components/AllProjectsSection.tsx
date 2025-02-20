import React, { useEffect } from 'react'
import SingleProjectCard from './SingleProjectCard'
import { Project } from '@/app/Data/AllProjects'
import { useContextApp } from '@/app/contextApp'

export default function AllProjectsSection() {
  const {
    allProjectsObject: { allProjects },
    filterSearchObject: { filterSearch },
  } = useContextApp()

  const filteredProjects = allProjects.filter((project) =>
    project.title.toLowerCase().includes(filterSearch.toLowerCase()),
  )

  return (
    <ul className="h-[78%] overflow-auto flex gap-4 flex-wrap mt-6 max-sm:grid max-sm:grid-cols-1">
      {filteredProjects.length > 0 ? (
        filteredProjects.map((project) => <SingleProjectCard key={project.id} project={project as Project} />)
      ) : (
        <p>No projects found</p>
      )}
    </ul>
  )
}
