import SearchBar from '@/app/Components/SearchBar'
import { useContextApp } from '@/app/contextApp'
import AddCircleOutline from '@mui/icons-material/AddCircleOutline'
import MenuOutlined from '@mui/icons-material/MenuOutlined'
import SearchOutlined from '@mui/icons-material/SearchOutlined'
import React from 'react'

export default function ProjectsHeader() {
  return (
    <div className="flex justify-between">
      <SearchBar placeholder="Search a project..." />
      <AddProjectButton />
    </div>
  )
}

function AddProjectButton() {
  const {
    closeRightSideBarObject: { setCloseRightSideBar },
  } = useContextApp()
  return (
    <div className="flex gap-3 items-center">
      <button className="bg-royal-blue-600 text-white pr-3 text-[14px] rounded-md flex gap-1 items-center p-2 max-sm:pr-2">
        <AddCircleOutline className="mt-[2px] text-xl" />
        <span className="max-sm:hidden">New Project</span>
      </button>
      <MenuOutlined
        onClick={() => setCloseRightSideBar((prev) => !prev)}
        className="text-slate-400 h-9 cursor-pointer hidden max-[942px]:block"
      />
    </div>
  )
}
