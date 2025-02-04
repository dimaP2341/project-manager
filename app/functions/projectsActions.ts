import React, { Dispatch, SetStateAction } from 'react'
import { Project } from '../Data/AllProjects'
import { IconData } from '../types/AppType'
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
