import { deleteProject } from '@/app/Functions/projectsActions'
import { deleteTask } from '@/app/Functions/tasksFunction'
import { useContextApp } from '@/app/contextApp'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

export default function ConfirmationWindow() {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [header, setHeader] = useState<string>('')
  const [message, setMessage] = useState<string>('')

  const {
    openConfirmationWindowObject: { openConfirmationWindow, setOpenConfirmWindow },
    selectedProjectObject: { setSelectedProject, selectedProject },
    allProjectsObject: { allProjects, setAllProjects },
    allTasksObject: { allTasks, setAllTasks },
    chosenProjectObject: { setChosenProject, chosenProject },
    selectedTaskObject: { selectedTask, setSelectedTask },
  } = useContextApp()

  function closeConfirmationWindow() {
    setOpenConfirmWindow(false)
    setSelectedProject(null)
  }

  async function deleteFunction() {
    try {
      setIsLoading(true)

      await new Promise((res) => setTimeout(res, 1000))

      if (selectedProject) {
        deleteProject(selectedProject, setSelectedProject, allProjects, setAllProjects, setOpenConfirmWindow)
      } else if (selectedTask) {
        deleteTask(selectedTask, allProjects, chosenProject, setAllTasks, setChosenProject, setAllProjects)
      }
    } catch (err) {
      console.log(err)
      toast.error('Something went wrong')
    } finally {
      setIsLoading(false)
      setOpenConfirmWindow(false)

      selectedTask === null && setChosenProject(null)

      setSelectedProject(null)
      setSelectedTask(null)
      toast.success(`${selectedProject ? 'project' : 'task'} deleted successfully`)
    }
  }

  useEffect(() => {
    if (selectedProject) {
      setHeader('Project')
      setMessage(
        `Are you sure you want to remove this project? This action cannot be undone, and will remove all projects associated with it.`,
      )
    } else if (selectedTask) {
      setHeader('Task')
      setMessage(`Are you sure you want to remove this project? This action cannot be undone.`)
    }
  }, [openConfirmationWindow, selectedProject, selectedTask])

  return (
    <div
      className={`w-[38%] bg-white max-sm:w-[91%] max-lg:w-[80%] p-6 fixed shadow-md z-[90] rounded-lg flex items-center top-[30%] left-1/2 -translate-x-1/2 ${
        openConfirmationWindow ? 'block' : 'hidden'
      }`}
    >
      <div className="rounde-lg p-6">
        <h2 className="text-xl font-semibold mb-5">Delete {header}</h2>
        <p className={`text-gray-600 mb-4 text-sm`}>{message}</p>

        <div className="flex justify-end gap-2 mt-10 text-[13px]">
          <button
            onClick={closeConfirmationWindow}
            className="px-4 py-2 border rounded-lg text-gray-600 hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={deleteFunction}
            className="px-4 py-2 bg-orange-600 hover:bg-orange-700 rounded-lg text-white"
          >
            {isLoading ? 'Deleting...' : 'Delete'}
          </button>
        </div>
      </div>
    </div>
  )
}
