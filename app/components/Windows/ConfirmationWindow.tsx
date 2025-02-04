import { useContextApp } from '@/app/contextApp'
import React from 'react'

export default function ConfirmationWindow() {
  const {
    openConfirmationWindowObject: { openConfirmationWindow, setOpenConfirmWindow },
    selectedProjectObject: { setSelectedProject },
  } = useContextApp()

  function closeConfirmationWindow() {
    setOpenConfirmWindow(false)
    setSelectedProject(null)
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
          <button className="px-4 py-2 bg-orange-600 hover:bg-orange-700 rounded-lg text-white">Delete</button>
        </div>
      </div>
    </div>
  )
}
