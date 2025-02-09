import React from 'react'
import { ProjectWithSelection, useTaskFormContext } from '../../Windows/TasksWindow'

export default function ProjectsListComponent() {
  const {
    updateAllProjectsObject: { updatedAllProjects, setUpdatedAllProjects },
  } = useTaskFormContext()
  return (
    <div className="flex flex-col gap-3">
      {updatedAllProjects.map((singleProject, index) => (
        <SingleProject key={index} singlePorject={singleProject} index={index} />
      ))}
    </div>
  )
}

function SingleProject({ singleProject, index }: { singleProject: ProjectWithSelection; index: number }) {
  const { setProject, setOpenTasksDropDown } = useTaskFormContext()

  function updateTheProjectState(index: number) {
    setProject(singleProject)

    setUpdatedAllProjects((prev) =>
      prev.map((project, i) => ({
        ...project,
        isSelected: index === i,
      })),
    )
    setOpenTasksDropDown(false)
  }

  return (
    <div
      onClick={() => updateTheProjectState(index)}
      className={`${singleProject.isSelected && 'bg-orange-50 border border-orange-200'} flex items-center gap-2 p-[7px] rounded-md cursor-pointer`}
    >
      <div className={`flex gap-2 items-center`}>
        <div>{getIconComponent(singleProject.icon, 'text-orange-600', '22px')} </div>
        <span className="mt-[3px] hover:text-orange-600 text-slate-500">{singleProject.title}</span>
      </div>
    </div>
  )
}
