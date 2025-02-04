import SearchBar from '@/app/components/SearchBar'
import AddOutlined from '@mui/icons-material/AddOutlined'
import MenuOutlined from '@mui/icons-material/MenuOutlined'
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
      <button className="bg-orange-600 text-white px-2 py-3 text-[14px] rounded-md flex gap-1 items-center">
        <AddOutlined sx={{ fontSize: '22px' }} className="mt-[2px]" />
        <span className="max-sm:hidden pr-2">New Task</span>
      </button>
      <MenuOutlined className="text-slate-400 h-9 cursor-pointer hidden max-sm:block" />
    </div>
  )
}
