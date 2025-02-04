import { Dispatch, ReactNode, SetStateAction } from 'react'
import { Project } from '../Data/AllProjects'

export type SideBarMenuItem = {
  id: number
  name: string
  isSelected: boolean
}

export type IconData = {
  id: number
  name: string
  icon: ReactNode
  isSelected: boolean
}

export type DropDownPositions = {
  top: number
  left: number
}

type SortingOption = {
  category: string
  options: {
    label: string
    value: string
    selected: boolean
  }
}

type SortingDropDownPosition = {
  left: number
  top: number
  width?: number
}

export type AppType = {
  openSideBarObject: {
    openSideBar: boolean
    setOpenSideBar: Dispatch<SetStateAction<boolean>>
  }

  sideBarMenuObject: {
    sideBarMenu: SideBarMenuItem[]
    setSideBarMenu: Dispatch<SetStateAction<SideBarMenuItem[]>>
  }

  openProjectWindowObject: {
    openProjectWindow: boolean
    setOpenProjectWindow: Dispatch<SetStateAction<boolean>>
  }

  allIconsDataObject: {
    allIconsData: IconData[]
    setAllIconsData: Dispatch<SetStateAction<IconData[]>>
  }

  openIconWindowObject: {
    openIconWindow: boolean
    setOpenIconWindow: Dispatch<SetStateAction<boolean>>
  }

  selectedIconObject: {
    selectedIcon: IconData | null
    setSelectedIcon: Dispatch<SetStateAction<IconData | null>>
  }

  allProjectsObject: {
    allProjects: Project[]
    setAllProjects: Dispatch<SetStateAction<Project[]>>
  }

  dropDownPositionObject: {
    dropDownPositions: DropDownPositions
    setDropDownPositions: Dispatch<SetStateAction<DropDownPositions>>
  }

  openDropDownObject: {
    openDropDown: boolean
    setOpenDropDown: Dispatch<SetStateAction<boolean>>
  }

  selectedProjectObject: {
    selectedProject: Project | null
    setSelectedProject: Dispatch<SetStateAction<Project | null>>
  }

  openConfirmationWindowObject: {
    openConfirmationWindow: boolean
    setOpenConfirmWindow: Dispatch<SetStateAction<boolean>>
  }

  sortingOptionObject: {
    sortingOptions: SortingOption[]
    setSortingOptions: Dispatch<SetStateAction<SortingOption[]>>
  }

openSortingDropDownObject: {
  openSortingDropDown: boolean
  setOpenSortingDropDown: Dispatch<SetStateAction<boolean>>
}

  sortingDropDownPositionsObject: {
    sortingDropDownPositions: SortingDropDownPosition
    setSortingDropDownPositions: Dispatch<SetStateAction<SortingDropDownPosition>>
  }
}
