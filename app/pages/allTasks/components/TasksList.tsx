import { Project, Task } from '@/app/Data/AllProjects'
import { useContextApp } from '@/app/contextApp'
import CachedOutlined from '@mui/icons-material/CachedOutlined'
import CircleOutlined from '@mui/icons-material/CircleOutlined'
import DeleteOutlineOutlined from '@mui/icons-material/DeleteOutlineOutlined'
import EditOutlined from '@mui/icons-material/EditOutlined'
import ListOutlined from '@mui/icons-material/ListOutlined'
import React, { useEffect, useLayoutEffect, useMemo, useState } from 'react'
import AllProjects from '../../allProjects/AllProjects'
import { Checkbox } from '@mui/material'

export default function TasksList() {
  const {
    chosenProjectObject: { chosenProject },
    allProjectsObject: { allProjects },
    tabsOptionsObject: { tabsOptions },
    allTasksObject: { allTasks, setAllTasks },
  } = useContextApp()

  const filteredTasks = useMemo(() => {
    let tasks = allTasks

    if (chosenProject) {
      tasks = tasks.filter((task) => task.projectName === chosenProject.title)
    }

    if (tabsOptions[1].isSelected) {
      tasks = tasks.filter((task) => task.status === 'Completed')
    } else {
      tasks = tasks.filter((task) => task.status === 'In progress')
    }

    return tasks
  }, [allTasks, chosenProject, tabsOptions, allTasks])

  return (
    <div className="ml-12 mt-11 flex flex-col gap-4 max-sm:ml-0">
      <Tabs />
      <div className="flex flex-col gap-4">
        {filteredTasks.map((singleTask, index) => (
          <SingleTask key={index} task={singleTask} />
        ))}
      </div>
    </div>
  )
}

function Tabs() {
  const {
    chosenProjectObject: { chosenProject },
    allProjectsObject: { allProjects },
    tabsOptionsObject: { tabsOptions, setTabsOptions },
  } = useContextApp()

  function countOnGoingTasks() {
    if (chosenProject) {
      return chosenProject.tasks.reduce((accTask, task) => {
        return accTask + (task.status === 'In progress' ? 1 : 0)
      }, 0)
    }

    return allProjects.reduce((accProjects, project) => {
      return (
        accProjects +
        project.tasks.reduce((accTasks, task) => {
          return accTasks + (task.status === 'In progress' ? 1 : 0)
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
    setTabsOptions((prev) =>
      prev.map((tab, i) => ({
        ...tab,
        isSelected: index === i,
      })),
    )
  }

  return (
    <div className="flex items-center gap-6 ml-3 mt-8 mb-5">
      {tabsOptions.map((singleTabOption, index) => (
        <div
          key={index}
          onClick={() => switchTabs(index)}
          className={`flex gap-2 cursor-pointer ${singleTabOption.isSelected ? 'text-royal-blue-600 font-semibold' : 'text-slate-300'}`}
        >
          <span>{singleTabOption.name}</span>
          <span
            className={`${singleTabOption.isSelected ? 'bg-royal-blue-600' : 'bg-slate-300'} text-white px-2 rounded-md max-[420px]:hidden`}
          >
            {singleTabOption.id === 1 ? countOnGoingTasks() : completedTasks()}
          </span>
        </div>
      ))}
    </div>
  )
}

function SingleTask({ task }: { task: Task }) {
  const {
    selectedTaskObject: { setSelectedTask },
    openTasksWindowObject: { setOpenTasksWindow },
    openConfirmationWindowObject: { setOpenConfirmWindow },
    allProjectsObject: { allProjects, setAllProjects },
    allTasksObject: { allTasks, setAllTasks },
    chosenProjectObject: { chosenProject, setChosenProject },
  } = useContextApp()
  const [checked, setChecked] = useState(false)
  const priorityColors = {
    Low: 'text-green-500',
    Medium: 'text-yellow-500',
    High: 'text-red-500',
  }

  useLayoutEffect(() => {
    setChecked(task.status === 'Completed')
  }, [task])

  function updateStatus() {
    const newStatus = checked ? 'In Progress' : 'Completed'

    const updatedProjects: Project[] = allProjects.map((project) => ({
      ...project,
      tasks: project.tasks.map((t) => (t.id === task.id ? { ...t, status: newStatus } : t)),
    }))

    const updatedTasks = allTasks.map((t) => (t.id === task.id ? { ...t, status: newStatus } : t))

    if (chosenProject) {
      const updateChosenProject: Project = {
        ...chosenProject,
        tasks: chosenProject.tasks.map((t) => {
          if (task.id === t.id) {
            return { ...t, status: newStatus }
          }

          return t
        }),
      }

      setChosenProject(updateChosenProject)
    }

    setAllProjects(updatedProjects)
    setAllTasks(updatedTasks)
    setChecked(!checked)
  }

  return (
    <div className="flex gap-1 items-center bg-white rounded-lg border border-slate-100 px-6 max-sm:px-2">
      <Checkbox
        sx={{
          color: 'purple',
          '&.Mui-checked': {
            color: 'purple',
          },
        }}
        onClick={updateStatus}
        checked={checked}
      />
      <div className="w-full flex gap-3 items-center justify-between p-5 py-6 max-sm:p-4">
        <div className="flex gap-3 items-center">
          <div>
            <div className="bg-royal-blue-200 rounded-lg p-2 flex items-center justify-center">
              <ListOutlined />
            </div>
          </div>
          <div
            onClick={() => {
              setSelectedTask(task)
              setOpenTasksWindow(true)
            }}
            className="flex flex-col"
          >
            <span className="font-bold hover:text-royal-blue-600 cursor-pointer max-sm:text-sm">{task.title}</span>
          </div>
          <div className="flex">
            <span className="text-slate-400 text-[13px] p-[2px]">{task.projectName}</span>
          </div>
        </div>
      </div>

      <div className="flex gap-14 font-bold items-center">
        <div className="flex gap-2 items-center max-sm:hidden">
          <CachedOutlined className="text-[24px] text-slate-400" />
          <span className="text-[14px] text-slate-400">In Progress</span>
        </div>

        <div className="flex gap-2 items-center max-sm:hidden">
          <CircleOutlined className={`text-[10px] ${priorityColors[task.priority]} `} />
          <span className="text-[14px] text-slate-400">{task.priority}</span>
        </div>

        <div className="flex gap-2 items-center">
          <div className="rounded-lg p-2 flex items-center justify-center cursor-pointer bg-royal-blue-200 hover:bg-royal-blue-300 transition-all">
            <EditOutlined sx={{ fontSize: '17px' }} className="text-royal-blue-600" />
          </div>
          <div className="rounded-lg p-2 flex items-center justify-center cursor-pointer bg-slate-200 hover:bg-slate-300">
            <DeleteOutlineOutlined sx={{ fontSize: '17px' }} className="text-slate-600" />
          </div>
        </div>
      </div>
    </div>
  )
}
