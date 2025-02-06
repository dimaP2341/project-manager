import { useContextApp } from '@/app/contextApp'
import CachedOutlined from '@mui/icons-material/CachedOutlined'
import CheckBox from '@mui/icons-material/CheckBox'
import CircleOutlined from '@mui/icons-material/CircleOutlined'
import DeleteOutlineOutlined from '@mui/icons-material/DeleteOutlineOutlined'
import EditOutlined from '@mui/icons-material/EditOutlined'
import ListOutlined from '@mui/icons-material/ListOutlined'
import React from 'react'

export default function TasksList() {
  return (
    <div className="ml-12 mt-11 flex flex-col gap-4 max-sm:ml-0">
      <Tabs />
      <div className="flex flex-col gap-4">
        <SingleTask />
        <SingleTask />
      </div>
    </div>
  )
}

function Tabs() {
  const {
    chosenProjectObject: {chosenProject}, 
    allProjectsObject: {allProjects},
    tabsOptionsObject: {tabsOptions, setTabsOptions}
  } = useContextApp()

  function countOnGoingTasks() {
    if (chosenProject) {
      return chosenProject.tasks.reduce((accTask, task) => {
        return accTask + (task.status === "In progress" ? 1 : 0)
      }, 0)
    }

    return allProjects.reduce((accProjects, project) => {
      return (accProjects + project.tasks.reduce((accTasks, task) => {
        return accTasks + (task.status === "In progress" ? 1 : 0)
      }, 0)
      )
    }, 0)
  }

  function completedTasks() {
    if (chosenProject) {
      return chosenProject.tasks.length - countOnGoingTasks()
    }

    const totalTasksInAllProjects = allProjects.reduce((acc, project) => {
      return acc + project.tasks.length
    }, 0)

    return totalTasksInAllProjects - countOnGoingTasks()
  }

  function switchTabs(index: number) {
    setTabsOptions((prev) => prev.map((tab, i) => ({
      ...tab,
      isSelected: index === i
    })))
  }

  return (
    <div className="flex items-center gap-6 ml-3 mt-8 mb-5">
      {tabsOptions.map((singleTabOption, index) => (
        <div key={index} onClick={() => switchTabs(index)} className={`flex gap-2 cursor-pointer ${singleTabOption.isSelected ? "text-orange-600 font-semibold" : "text-slate-300"}`}>
          <span>{singleTabOption.name}</span>
          <span className={`${singleTabOption.isSelected ? "bg-orange-600" : "bg-slate-300"} text-white px-2 rounded-md max-[420px]:hidden`}>{singleTabOption.id === 1 ? countOnGoingTasks() : completedTasks()}</span>
        </div>
      ))}
    </div>
  )
}

function SingleTask() {
  return (
    <div className="flex gap-1 items-center bg-white rounded-lg border border-slate-100 px-6 max-sm:px-2">
      <CheckBox />
      <div className="w-full flex gap-3 items-center justify-between p-5 py-6 max-sm:p-4">
        <div className="flex gap-3 items-center">
          <div>
            <div className="bg-orange-200 rounded-lg p-2 flex items-center justify-center">
              <ListOutlined />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-bold hover:text-orange-600 cursor-pointer max-sm:text-sm">
              Create the UI Design of the task
            </span>
          </div>
          <div className="flex">
            <span className="text-slate-400 text-[13px] p-[2px]">Project</span>
          </div>
        </div>
      </div>

      <div className="flex gap-14 font-bold items-center">
        <div className="flex gap-2 items-center max-sm:hidden">
          <CachedOutlined className="text-[24px] text-slate-400" />
          <span className="text-[14px] text-slate-400">In Progress</span>
        </div>

        <div className="flex gap-2 items-center max-sm:hidden">
          <CircleOutlined className="text-[10px] text-green-600" />
          <span className="text-[14px] text-slate-400">Low</span>
        </div>

        <div className="flex gap-2 items-center">
          <div className="rounded-lg p-2 flex items-center justify-center cursor-pointer bg-orange-200 hover:bg-orange-300 transition-all">
            <EditOutlined sx={{ fontSize: '17px' }} className="text-orange-600" />
          </div>
          <div className="rounded-lg p-2 flex items-center justify-center cursor-pointer bg-slate-200 hover:bg-slate-300">
            <DeleteOutlineOutlined sx={{ fontSize: '17px' }} className="text-slate-600" />
          </div>
        </div>
      </div>
    </div>
  )
}
