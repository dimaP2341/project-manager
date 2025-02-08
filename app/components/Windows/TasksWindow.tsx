import { Project } from "@/app/Data/AllProjects"
import { SortingDropDownPosition } from "@/app/Types/AppType"
import { useContextApp } from "@/app/contextApp"
import CircleOutlined from "@mui/icons-material/CircleOutlined"
import KeyboardArrowDownOutlined from "@mui/icons-material/KeyboardArrowDownOutlined"
import { ReactNode, createContext, use, useContext, useEffect, useRef, useState } from "react"

export type SelectionOption = "priority" | "project"

export type Priority = {
    id: number
    name: string
    icon: ReactNode
    isSelected: boolean
}

export type ProjectWithSelection = Project & {isSelected: boolean}

const TaskFormState = {
    clickedSelection: null,
    setClickedSelection: () => {},
    openClickedSelection: false,
    setOpenTasksDropDown: () => {},
    tasksDropDownPositions: {left: 0, top: 0},
    setTasksDropDownPositions: () => {},
    priority: null,
    setProject: () => {},
    priorityListObject: {
        priorityList: [],
        setPriorityList: () => {}
    },
    updateAllProjectsObject: {
        updatedAllProjects: [],
        setUpdatedAllProjects: () => {}
    }
}

const TaskFormContext = createContext(TaskFormState)

export function useTaskFormContext() {
    return useContext(TaskFormContext)
}

export function TasksWindow() {
    const [clickedSelection, setClickedSelection] = useState<SelectionOption | null>(null)
    const [openTasksDropDown, setOpenTasksDropDown] = useState(false)
    const [tasksDropDownPositions, setTasksDropDownPostions] = useState<SortingDropDownPosition>({left: 0, top: 0, width: 0})
    const [priority, setPriority] = useState<Priority | null>(null)
    const [project, setProject] = useState<Project | null>(null)
    const [priorityList, setPriorityList] = useState<Priority[]>([
        {
            id: 1,
            name: "Low",
            icon: <CircleOutlined className="text-[14px] text-green-500"/>,
            isSelected: false 
        },
        {
            id: 2,
            name: "Medium",
            icon: <CircleOutlined className="text-[14px] text-yellow-500" />,
            isSelected: false,
        },
        {
            id: 3,
            name: "High",
            icon: <CircleOutlined className="text-[14px] text-red-500" />,
            isSelected: false
        }
    ])

    const {
        allProjectsObject: {allProjects, setAllProjects},
        openTasksWindowObject: {openTasksWindow, setOpenTasksWindow}
    } = useContextApp()

    const [updateAllProjects, setUpdateAllProjects] = useState<ProjectWithSelection[] | null>([])

    useEffect(() => {
        const tempAllProjects: ProjectWithSelection[] = allProjects.map((project) => ({
            ...project,
            isSelected: false
        }))

        setUpdateAllProjects(tempAllProjects)
    }, [allProjects])

    return (
        <TaskFormContext.Provider value={{
            clickedSelection,
            setClickedSelection,
            openTasksDropDown,
            setOpenTasksDropDown,
            tasksDropDownPositions,
            setTasksDropDownPositions,
            priority,
            setPriority,
            project,
            setProject,
            priorityListObject: {
                priorityList,
                setPriorityList
            },
            updateAllProjectsObject: {
                updatedAllProjects,
                setUpdatedAllProjects
            }
        }}>
            <div className={`w-[48%] max-sm:w-[82%] max-[600]:w-[93%] z-[80] p-3 left-1/2 top-[47%] -translate-y-1/2 -translate-x-1/2 absolute flex flex-col gap-3 border border-slate-50 bg-white rounded-lg shadow-md ${openTasksWindow ? "" : "hidden"}`}>
                <TasksDropDown/>
                <Header/>
                <form className="flex flex-col gap-2 pt-8 px-7 mt-3">
                    <TaskInput/>
                    <div className="flex justify-between gap-3 mt-5">
                        <PrioritySelection/>
                        <PrioritySelection/>
                    </div>
                </form>
            </div>
        </TaskFormContext.Provider>
    )
}

function PrioritySelection() {
    const {
        setClickedSelection,
        setOpenTasksDropDown,
        setTasksDropDownPositions,
        priority
    } = useTaskFormContext()

    const prioritySelectionRef = useRef<HTMLDivElement>(null)

    function handleClickedSelection() {
        if (prioritySelectionRef.current) {
            const rect = prioritySelectionRef.current.getBoundingClientRect()
            const {top, left, width} = rect
            setTasksDropDownPositions({left, top, width})
        }

        setOpenTasksDropDown(true)
        setClickedSelection("priority")
    }

    return (
        <div ref={prioritySelectionRef} onClick={handleClickedSelection} className="flex flex-col gap-2 w-full relative cursor-pointer">
            <span className="text-[14px] font-medium text-slate-600">Task Priority</span>
            <div className="flex justify-between items-center border h-[42px] px-2 rounded-md">
                <span className="w-full text-[13px] text-slate-400">
                    {priority ? (
                        <div className="flex gap-1 items-center">
                            <div>{priority.icon}</div>
                            <span className="mt-[3px]">{priority.name}</span>
                        </div>
                    ) : (
                        <span>Select Priority</span>
                    )}
                </span>
                <KeyboardArrowDownOutlined className="absolute top-[40px] right-3 text-slate-400"/>
            </div>
        </div>
    )
}