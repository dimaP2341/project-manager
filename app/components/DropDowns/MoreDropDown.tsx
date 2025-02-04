import { useContextApp } from '@/app/contextApp'
import DeleteOutline from '@mui/icons-material/DeleteOutline'
import EditOutlined from '@mui/icons-material/EditOutlined'
import React, { useEffect, useRef, useState } from 'react'

export default function MoreDropDown() {
  const {
    openDropDownObject: { setOpenDropDown, openDropDown },
  } = useContextApp()

  const [dropDownOptions, setDropDownOptions] = useState([
    { id: 1, name: 'Edit', icon: <EditOutlined /> },
    { id: 2, name: 'Delete', icon: <DeleteOutline /> },
  ])

  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpenDropDown(false)
      }
    }

    if (openDropDown) {
      document.addEventListener('mousedown', handleClickOutside)
    } else {
      document.removeEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [openDropDown, setOpenDropDown])

  return (
    <div
      ref={menuRef}
      style={{ top: dropDownPositions.top, left: dropDownPositions.left }}
      className={`bg-white fixed z-[90] top-14 left-24 px-5 border-slate-50 py-6 w-[130px] select-none shadow-md rounded-lg flex flex-col gap-7 ${
        openDropDown ? 'block' : 'hidden'
      }`}
    >
      {dropDownOptions.map((dropDownOption) => (
        <div
          key={dropDownOption.id}
          className={`flex gap-1 items-center text-slate-400 cursor-pointer hover:text-orange-600 ${
            dropDownOption.id === 2 && 'hover:text-red-600'
          }`}
        >
          {dropDownOption.icon}
          <span className="text-[14px]">{dropDownOption.name}</span>
        </div>
      ))}
    </div>
  )
}
