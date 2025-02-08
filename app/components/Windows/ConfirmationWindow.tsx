import { deleteProject } from '@/app/Functions/projectsActions'
import { useContextApp } from '@/app/contextApp'
import React, { useState } from 'react'
import toast from 'react-hot-toast'

export default function ConfirmationWindow() {
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const {
    openConfirmationWindowObject: { openConfirmationWindow, setOpenConfirmWindow },
    selectedProjectObject: { setSelectedProject, selectedProject },
    allProjectsObject: {allProjects, setAllProjects},
    chosenProjectObject: {setChosenProject}
  } = useContextApp()

  function closeConfirmationWindow() {
    setOpenConfirmWindow(false)
    setSelectedProject(null)
  }

  async function deleteFunction() {
    try {
     setIsLoading(true)
     
     await new Promise((res) => setTimeout(res, 1000))

     deleteProject(selectedProject, setSelectedProject, allProjects, setAllProjects, setOpenConfirmWindow)
    } catch (err) {
      console.log(err)
      toast.error("Something went wrong")
    } finally {
      setIsLoading(false)
      setOpenConfirmWindow(false)
      setChosenProject(null)
      toast.success("Project deleted successfully")
    }
  }

  return (
    <div
      className={`w-[38%] bg-white max-sm:w-[91%] max-lg:w-[80%] p-6 fixed shadow-md z-[90] rounded-lg flex items-center top-[30%] left-1/2 -translate-x-1/2 ${
        openConfirmationWindow ? 'block' : 'hidden'
      }`}
    >
      <div className="rounde-lg p-6">
        <h2 className="text-xl font-semibold mb-5">Delete Project</h2>
        <p className={`text-gray-600 mb-4 text-sm`}>
          Are you sure you want to remove this project? This action cannot be undone, and will remove all projects
          associated with it.
        </p>

        <div className="flex justify-end gap-2 mt-10 text-[13px]">
          <button
            onClick={closeConfirmationWindow}
            className="px-4 py-2 border rounded-lg text-gray-600 hover:bg-gray-100"
          >
            Cancel
          </button>
          <button onClick={deleteFunction} className="px-4 py-2 bg-orange-600 hover:bg-orange-700 rounded-lg text-white">{isLoading ? "Deleting..." : "Delete"}</button>
        </div>
      </div>
    </div>
  )
}
