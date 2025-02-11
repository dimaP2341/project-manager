import { Dispatch, SetStateAction } from 'react'
import { Priority } from '../Components/Windows/TasksWindow'
import { Project, Task } from '../Data/AllProjects'

interface DeleteTaskProps {
  taskToDelete: Task
  allProjects: Project[]
  chosenProject: Project | null
  setAllTasks: (tasks: Task[]) => void
  setChosenProject: (project: Project) => void
  setAllProjects: (projects: Project[]) => void
}

interface UpdateTaskAndProjectsProps {
  selectedTask: Task
  data: FormData
  selectedIcon: { name: string } | null
  project: Project | null
  priority: Priority | null
  allProjects: Project[]
  chosenProject: Project | null
  setAllTasks: Dispatch<SetStateAction<Task[]>>
  setChosenProejct: Dispatch<SetStateAction<Project>>
  setAllProjects: Dispatch<SetStateAction<Project[]>>
}

export const deleteTask = ({
  taskToDelete,
  allProjects,
  chosenProject,
  setAllTasks,
  setChosenProject,
  setAllProjects,
}: DeleteTaskProps): void => {
  const updatedProjects = allProjects.map((proj) => ({
    ...proj,
    tasks: proj.tasks.filter((task) => task.id !== taskToDelete.id),
  }))

  const updateAllTasks = updatedProjects.flatMap((proj) => proj.tasks)
  setAllTasks(updateAllTasks)

  if (chosenProject && chosenProject.tasks.some((task) => task.id === taskToDelete.id)) {
    const updatedChosenProject: Project = {
      ...chosenProject,
      tasks: chosenProject.tasks.filter((task) => task.id !== taskToDelete.id),
    }
    setChosenProject(updatedChosenProject)
  }

  setAllProjects(updatedProjects)
}
