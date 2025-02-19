import React from 'react'
import SingleProjectCard from './SingleProjectCard'
import { useFilteredData } from '@/app/Hooks/useFilteredFunctions'
import { Project } from '@/app/Data/AllProjects'

export default function AllProjectsSection() {
  const { filteredData } = useFilteredData('projects')

  return (
    <ul className="h-[78%] overflow-auto flex gap-4 flex-wrap mt-6 max-sm:grid max-sm:grid-cols-1">
      {filteredData.map((project) => (
        <SingleProjectCard key={project.id} project={project as Project} />
      ))}
    </ul>
  )
}
