import React from 'react'
import TasksHeader from './components/TasksHeader'
import TasksSubHeader from './components/TasksSubHeader'
import TasksList from './components/TasksList'

export default function AllTasksContainer() {
  return (
    <div className="bg-slate-50 w-full p-10 max-sm:p-8 max-sm:py-9">
      <TasksHeader />
      <TasksSubHeader />
      <TasksList />
    </div>
  )
}
