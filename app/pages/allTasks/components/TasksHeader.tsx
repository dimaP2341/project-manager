import SearchBar from '@/app/Components/SearchBar'
import AddOutlined from '@mui/icons-material/AddOutlined'
import React from 'react'

export default function TasksHeader() {
  return (
    <div className="flex justify-between">
      <SearchBar placeholder="Search a Task..." />
      <AddProjectButton />
    </div>
  )
}

function AddProjectButton() {
  return (
    <div className="flex gap-3 items-center">
      <button className="bg-royal-blue-600 text-white px-2 py-3 text-[14px] rounded-md flex gap-1 items-center">
        <AddOutlined sx={{ fontSize: '22px' }} className="mt-[2px]" />
        <span className="max-sm:hidden pr-2">New Task</span>
      </button>
    </div>
  )
}
