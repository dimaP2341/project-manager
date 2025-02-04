import React, { Dispatch, SetStateAction } from 'react'
import { Project } from '../Data/AllProjects'
import { IconData } from '../Types/AppType'
import { v4 as uuidv4 } from 'uuid'

export function addNewProject(
  data: FormData,
  allProjects: Project[],
  setAllProjects: Dispatch<SetStateAction<Project[]>>,
  setOpenProjectWindow: Dispatch<SetStateAction<boolean>>,
  selectedIcon: IconData | null,
  reset: () => void,
) {
  try {
    const newProject: Project = {
      id: uuidv4(),
      title: data.projectName,
      icon: selectedIcon?.name || 'LocalLibrary',
      tasks: [],
      clerkUserId: '123',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    setAllProjects([...allProjects, newProject])
    setOpenProjectWindow(false)
    reset()
  } catch (err) {}
}

export function deleteProject(selectedProject: Project | null, setSelectedProject: Dispatch<SetStateAction<Project | null>>, allProjects: Project[], setAllProjects: Dispatch<SetStateAction<Project[]>>, setOpenProjectWindow: Dispatch<SetStateAction<boolean>>) {
  if (selectedProject) {
    const updateAllProjects = allProjects.filter(project => project.id !== selectedProject.id)

    setAllProjects(updateAllProjects)
    setSelectedProject(null)
    setOpenProjectWindow(false)
  }
}