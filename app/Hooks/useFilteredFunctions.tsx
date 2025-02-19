import { ChangeEvent, useEffect, useState } from 'react'
import { useContextApp } from '../contextApp'
import { Project, Task } from '../Data/AllProjects'

export const useFilteredData = (type: 'tasks' | 'projects' = 'tasks') => {
  const {
    allProjectsObject: { allProjects },
    allTasksObject: { allTasks },
  } = useContextApp()

  const [filteredData, setFilteredData] = useState<Project[] | Task[]>([])
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    let data = type === 'projects' ? allProjects : allTasks

    // If there's a search term, filter the data
    if (searchTerm) {
      console.log('Filtering with term:', searchTerm)
      data = data.filter((item) => item.title.toLowerCase().includes(searchTerm.toLowerCase()))
    } else {
      // If no search term, reset to all data
      data = type === 'projects' ? allProjects : allTasks
    }

    console.log('Filtered Data:', data) // Log the filtered data
    setFilteredData(data)
  }, [allProjects, allTasks, type, searchTerm]) // Re-run when `searchTerm` changes

  const filterFunction = (e: ChangeEvent<HTMLInputElement>) => {
    console.log('Search input changed:', e.target.value)
    setSearchTerm(e.target.value)
  }

  return { filterFunction, filteredData }
}
