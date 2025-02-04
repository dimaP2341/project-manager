'use client'
import { Dispatch, SetStateAction, createContext, useContext, useEffect, useState } from 'react'
import { AppType, IconData, SideBarMenuItem } from './types/AppType'
import { Project, projectsData } from './Data/AllProjects'

const defaultState: AppType = {
  openSideBarObject: { openSideBar: false, setOpenSideBar: () => {} },
  sideBarMenuObject: { sideBarMenu: [], setSideBarMenu: () => {} },
  openProjectWindowObject: {
    openProjectWindow: false,
    setOpenProjectWindow: () => {},
  },
  allIconsDataObject: { allIconsData: [], setAllIconsData: () => {} },
  openIconWindowObject: { openIconWindow: false, setOpenIconWindow: () => {} },
  selectedIconObject: { selectedIcon: null, setSelectedIcon: () => {} },
}

const ContextApp = createContext<AppType>(defaultState)

export default function ContextAppProvider({ children }: { children: React.ReactNode }) {
  const [openSideBar, setOpenSideBar] = useState(false)
  const [isMobileView, setIsMobileView] = useState(false)
  const [sideBarMenu, setSideBarMenu] = useState<SideBarMenuItem[]>([
    {
      id: 1,
      name: 'All Projects',
      isSelected: true,
    },
    {
      id: 2,
      name: 'All Tasks',
      isSelected: false,
    },
    {
      id: 3,
      name: 'Logout',
      isSelected: false,
    },
  ])

  const [openProjectWindow, setOpenProjectWindow] = useState(false)
  const [allIconsData, setAllIconsData] = useState<IconData[]>(allIconsData)
  const [openIconWindow, setOpenIconWindow] = useState(false)
  const [selectedIcon, setSelectedIcon] = useState<IconData | null>(null)
  const [allProjects, setAllProjects] = useState<Project[]>([])
  const [openDropDown, setOpenDropDown] = useState<boolean>(false)
  const [dropDownPositions, setDropDownPositions] = useState({
    top: 0,
    left: 0,
  })

  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [openConfirmationWindow, setOpenConfirmWindow] = useState<boolean>(false)

  useEffect(() => {
    function handleResize() {
      setIsMobileView(window.innerWidth <= 940)
    }

    handleResize()

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      try {
        await new Promise((res) => setTimeout(res, 1000))
        setAllProjects(projectsData)
      } catch (err) {
        console.log(err)
      }
    }
    fetchData()
  }, [])

  useEffect(() => {
    if (!isMobileView) {
      setOpenSideBar(false)
    }
  }, [isMobileView])

  useEffect(() => {
    setOpenSideBar(false)
  }, [sideBarMenu])

  return (
    <ContextApp.Provider
      value={{
        openSideBarObject: { openSideBar, setOpenSideBar },
        sideBarMenuObject: { sideBarMenu, setSideBarMenu },
        openProjectWindowObject: { openProjectWindow, setOpenProjectWindow },
        allIconsDataObject: { allIconsData, setAllIconsData },
        openIconWindowObject: { openIconWindow, setOpenIconWindow },
        selectedIconObject: { selectedIcon, setSelectedIcon },
        allProjectsObject: { allProjects, setAllProjects },
        dropDownPositionObject: {
          dropDownPositions,
          setDropDownPositions,
        },
        openDropDownObject: { openDropDown, setOpenDropDown },
        selectedProjectObject: { selectedProject, setSelectedProject },
        openConfirmationWindowObject: { openConfirmationWindow, setOpenConfirmWindow },
      }}
    >
      {children}
    </ContextApp.Provider>
  )
}

export function useContextApp() {
  return useContext(ContextApp)
}
