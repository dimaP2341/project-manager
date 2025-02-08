import { Dispatch, SetStateAction } from 'react'
import { Project } from '../Data/AllProjects'
import { IconData } from '../Types/AppType'
import { v4 as uuidv4 } from 'uuid'
import { FormData } from '../Components/Windows/ProjectWindow'

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

export function editProject(selectedProject: Project | null, setSelectedProject: Dispatch<SetStateAction<Project | null>>, data: FormData, selectedIcon: IconData | null, allProjects: Project[], setAllProjects: Dispatch<SetStateAction<Project[]>>, setOpenConfirmationWindow: Dispatch<SetStateAction<boolean>>) {
  if (selectedProject) {
    const updateProject: Project = {
      ...selectedProject,
      title: data.projectName,
      icon: selectedIcon?.name || "LocalLibrary",
      tasks: selectedProject.tasks.map((task) => ({
        ...task,
        projectName: data.projectName
      }))
    }

    const updateAllProjects = allProjects.map((project) => {
      if (project.id === selectedProject.id) {
        return updateProject
      }

      return project
    })

    setAllProjects(updateAllProjects)
    setSelectedProject(null)
    setOpenConfirmationWindow(false)
  }
}