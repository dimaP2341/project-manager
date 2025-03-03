import { Dispatch, ReactNode, SetStateAction } from 'react'
import { Project, Task } from '../Data/AllProjects'

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

export type SortingDropDownPosition = {
  left: number
  top: number
  width?: number
}

export type TabOption = {
  id: number
  name: string
  isSelected: boolean
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

  sortingOptionsProjectObject: {
    sortingOptionsProject: SortingOption[]
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

  chosenProjectObject: {
    chosenProject: Project | null
    setChosenProject: Dispatch<SetStateAction<Project | null>>
  }

  tabsOptionsObject: {
    tabsOptions: TabOption[]
    setTabsOptions: Dispatch<SetStateAction<TabOption[]>>
  }

  openProjectsDropDownObject: {
    openProjectsDropDown: boolean
    setOpenProjectsDropDown: Dispatch<SetStateAction<boolean>>
  }

  projectsDropDownPositionsObject: {
    projectsDropDownPositions: SortingDropDownPosition
    setProjectsDropDownPositions: Dispatch<SetStateAction<SortingDropDownPosition>>
  }

  openTasksWindowObject: {
    openTasksWindow: boolean
    setOpenTasksWindow: Dispatch<SetStateAction<boolean>>
  }

  allTasksObject: {
    allTasks: Task[]
    setAllTasks: Dispatch<SetStateAction<Task[]>>
  }
  selectedTaskObject: {
    selectedTask: Task | null
    setSelectedTask: Dispatch<SetStateAction<Task | null>>
  }
  projectClickedObject: {
    projectClicked: Project | null
    setProjectClicked: Dispatch<SetStateAction<Project | null>>
  }
  closeRightSideBarObject: {
    closeRightSideBar: boolean
    setCloseRightSideBar: Dispatch<SetStateAction<boolean>>
  }
  filterSearchObject: {
    filterSearch: string
    setFilterSearch: Dispatch<SetStateAction<string>>
  }
}
