'use client'
import BorderAllOutlined from '@mui/icons-material/BorderAllOutlined'
import LogoutOutlined from '@mui/icons-material/LogoutOutlined'
import SplitscreenOutlined from '@mui/icons-material/SplitscreenOutlined'
import TaskAltOutlined from '@mui/icons-material/TaskAltOutlined'
import React, { ComponentType, useEffect, useRef } from 'react'
import { useContextApp } from '../contextApp'
import { SvgIconProps } from '@mui/material'

export default function SideBar() {
  const {
    openSideBarObject: { openSideBar, setOpenSideBar },
  } = useContextApp()

  const sideBarMenuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (sideBarMenuRef.current && !sideBarMenuRef.current.contains(event.target as Node)) {
        setOpenSideBar(false)
      }
    }

    if (openSideBar) {
      document.addEventListener('mousedown', handleClickOutside)
    } else {
      document.removeEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [openSideBar, setOpenSideBar])

  return (
    <div
      className={` ${
        openSideBar ? 'w-[280px] fixed shadow-xl' : 'w-[97px] max-[940px]:hidden'
      } h-screen py-10 bg-white flex flex-col items-center justify-between z-[60] transition-all `}
    >
      <Logo />
      <Menu />
      <Profile />
    </div>
  )
}

function Profile() {
  const {
    openSideBarObject: { openSideBar },
  } = useContextApp()

  return (
    <div className="flex items-center gap-2">
      <div className="w-8 h-8 bg-orange-600 rounded-md"></div>
      {openSideBar && (
        <ul>
          <li className="font-bold text-[14px]">Ali Ounassi</li>
          <li className="text-slate-400 text-[11px]">aliounassi@gmail.com</li>
        </ul>
      )}
    </div>
  )
}

function Logo() {
  const {
    openSideBarObject: { openSideBar },
  } = useContextApp()
  return (
    <div className="rounded-md w-10 h-10 flex items-center justify-center">
      <TaskAltOutlined className="text-orange-600 font-bold text-4xl" />

      {openSideBar && (
        <div className="text-xl flex items-center gap-1">
          <span className="font-bold">Project</span>
          <span className="text-slate-600">Master</span>
        </div>
      )}
    </div>
  )
}

function Menu() {
  const {
    openSideBarObject: { openSideBar },
    sideBarMenuObject: { sideBarMenu, setSideBarMenu },
  } = useContextApp()

  const iconMap: Record<string, ComponentType<SvgIconProps>> = {
    '1': BorderAllOutlined,
    '2': SplitscreenOutlined,
    '3': LogoutOutlined,
  }

  function handleClickedItem(id: number) {
    const updateMenuSideBar = sideBarMenu.map((item) => {
      if (item.id === id) {
        return { ...item, isSelected: true }
      }
      return { ...item, isSelected: false }
    })
    setSideBarMenu(updateMenuSideBar)
  }
  console.log(sideBarMenu)
  return (
    <div className="flex flex-col gap-6">
      {sideBarMenu.map((menuItem) => {
        const IconComponent = iconMap[menuItem.id.toString()]

        return (
          <div
            onClick={() => {
              if (menuItem.id === 1 || menuItem.id === 2) {
                handleClickedItem(menuItem.id)
              }
            }}
            key={menuItem.id}
            className="flex items-center gap-2 cursor-pointer"
          >
            <IconComponent
              sx={{ fontSize: '25px' }}
              className={`${menuItem.isSelected ? 'text-orange-600' : 'text-slate-300'}`}
            />

            {openSideBar && (
              <span className={`${menuItem.isSelected ? 'text-orange-600' : 'text-slate-300'}`}>{menuItem.name}</span>
            )}
          </div>
        )
      })}
    </div>
  )
}
