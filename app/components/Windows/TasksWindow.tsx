import { Project, Task } from '@/app/Data/AllProjects'
import { SortingDropDownPosition } from '@/app/Types/AppType'
import { useContextApp } from '@/app/contextApp'
import { zodResolver } from '@hookform/resolvers/zod'
import CircleOutlined from '@mui/icons-material/CircleOutlined'
import KeyboardArrowDownOutlined from '@mui/icons-material/KeyboardArrowDownOutlined'
import { ReactNode, createContext, use, useContext, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { FieldErrors, SubmitHandler, UseFormRegister, useForm } from 'react-hook-form'
import { z } from 'zod'

export type SelectionOption = 'priority' | 'project'

export type Priority = {
  id: number
  name: string
  icon: ReactNode
  isSelected: boolean
}

export type ProjectWithSelection = Project & { isSelected: boolean }

const TaskFormState = {
  clickedSelection: null,
  setClickedSelection: () => {},
  openClickedSelection: false,
  setOpenTasksDropDown: () => {},
  tasksDropDownPositions: { left: 0, top: 0 },
  setTasksDropDownPositions: () => {},
  priority: null,
  setProject: () => {},
  priorityListObject: {
    priorityList: [],
    setPriorityList: () => {},
  },
  updateAllProjectsObject: {
    updatedAllProjects: [],
    setUpdatedAllProjects: () => {},
  },
}

const TaskFormContext = createContext(TaskFormState)

export function useTaskFormContext() {
  return useContext(TaskFormContext)
}

const schema = z.object({
  taskName: z
    .string()
    .min(1, { message: 'Task name is required' })
    .max(30, { message: 'Task name must be 30 characters or less' }),
})

type FormData = z.infer<typeof schema>

export function TasksWindow() {
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
    setFocus,
    setError,
  } = useForm<FormData>({ resolver: zodResolver(schema) })
  const [clickedSelection, setClickedSelection] = useState<SelectionOption | null>(null)
  const [openTasksDropDown, setOpenTasksDropDown] = useState(false)
  const [tasksDropDownPositions, setTasksDropDownPostions] = useState<SortingDropDownPosition>({
    left: 0,
    top: 0,
    width: 0,
  })
  const [priority, setPriority] = useState<Priority | null>(null)
  const [project, setProject] = useState<Project | null>(null)
  const [priorityList, setPriorityList] = useState<Priority[]>([
    {
      id: 1,
      name: 'Low',
      icon: <CircleOutlined className="text-[14px] text-green-500" />,
      isSelected: false,
    },
    {
      id: 2,
      name: 'Medium',
      icon: <CircleOutlined className="text-[14px] text-yellow-500" />,
      isSelected: false,
    },
    {
      id: 3,
      name: 'High',
      icon: <CircleOutlined className="text-[14px] text-red-500" />,
      isSelected: false,
    },
  ])

  const {
    allProjectsObject: { allProjects, setAllProjects },
    openTasksWindowObject: { openTasksWindow, setOpenTasksWindow },
    chosenProjectObject: { chosenProject, setChosenProject },
    allTasksObject: { allTasks, setAllTasks },
  } = useContextApp()

  const [updateAllProjects, setUpdateAllProjects] = useState<ProjectWithSelection[] | null>([])

  useEffect(() => {
    const tempAllProjects: ProjectWithSelection[] = allProjects.map((project) => ({
      ...project,
      isSelected: false,
    }))

    setUpdateAllProjects(tempAllProjects)
  }, [allProjects])

  useLayoutEffect(() => {
    reset()

    setPriority(null)
    setProject(null)

    setTimeout(() => {
      setFocus('taskName')
    }, 0)

    setSelectionErrors((prev) => prev.map((err) => ({ ...err, show: false })))
  }, [openTasksWindow])

  const [selectionErrors, setSelectionErrors] = useState([
    {
      id: 1,
      label: 'priority',
      message: 'Please select the priority',
      show: false,
    },
    {
      id: 2,
      label: 'project',
      message: 'Please select the priority',
      show: false,
    },
  ])

  const [isLoading, setIsLoading] = useState(false)
  const onSubmit: SubmitHandler<FormData> = (data) => {
    if (project) {
      const findProject = updateAllProjects?.find((proj) => proj.id === project.id)

      const findTask = findProject?.tasks.find((task) => task.title.toLowerCase() === data.taskName.toLocaleLowerCase())

      if (findTask) {
        setError('taskName', {
          type: 'manual',
          message: 'task already exists',
        })

        setFocus('taskName')
        return
      }
    }

    const newErrors = selectionErrors.map((error) => {
      if (error.label === 'priority' && !priority) {
        return { ...error, show: true }
      }

      if (error.label === 'project' && !project) {
        return { ...error, show: true }
      }

      return { ...error, show: false }
    })

    if (newErrors.every((err) => err.show === false)) {
      tasksFunction(data)
    }

    setSelectionErrors(newErrors)
  }

  async function tasksFunction(data: FormData) {
    try {
      setIsLoading(true)

      await new Promise((res) => setTimeout(res, 1000))

      addNewTask(data)
    } catch (err) {
    } finally {
      setIsLoading(false)
      setOpenTasksWindow(false)
    }
  }

  function addNewTask(data: FormData) {
    const newTask: Task = {
      id: uuidv4(),
      title: data.taskName,
      icon: selectedIcon ? selectedIcon.name : 'MenuBook',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      priority: priority ? priority?.name : 'Low',
      projectName: project?.title || '',
      status: 'In progress',
    }

    const updateAllProjects = allProjects.map((proj) => ({
      ...proj,
      tasks: proj.id === project?.id ? [...proj.tasks, newTask] : [...proj.tasks],
    }))

    if (chosenProject && chosenProject.id === project?.id) {
      const copyChosenProject: Project = {
        ...chosenProject,
        tasks: [...chosenProject.tasks, newTask],
      }
      setChosenProject(copyChosenProject)
    }

    setAllTasks([...allTasks, newTask])
    setAllProjects(updateAllProjects)
  }

  return (
    <TaskFormContext.Provider
      value={{
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
          setPriorityList,
        },
        updateAllProjectsObject: {
          updatedAllProjects,
          setUpdatedAllProjects,
        },
        selectionErrorsObject: {
          selectionErrors,
          setSelectionErrors,
        },
      }}
    >
      <div
        className={`w-[48%] max-sm:w-[82%] max-[600]:w-[93%] z-[80] p-3 left-1/2 top-[47%] -translate-y-1/2 -translate-x-1/2 absolute flex flex-col gap-3 border border-slate-50 bg-white rounded-lg shadow-md ${openTasksWindow ? '' : 'hidden'}`}
      >
        <TasksDropDown />
        <Header />
        <form onClick={handleSubmit(onSubmit)} className="flex flex-col gap-2 pt-8 px-7 mt-3">
          <TaskInput register={register} errors={errors} />
          <div className="flex justify-between gap-3 mt-5">
            <PrioritySelection />
            <PrioritySelection />
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
    priority,
    selectionErrorsObject: { selectionErrors, setSelectionErrors },
  } = useTaskFormContext()

  const prioritySelectionRef = useRef<HTMLDivElement>(null)

  function handleClickedSelection() {
    if (prioritySelectionRef.current) {
      const rect = prioritySelectionRef.current.getBoundingClientRect()
      const { top, left, width } = rect
      setTasksDropDownPositions({ left, top, width })
    }

    setOpenTasksDropDown(true)
    setClickedSelection('priority')
    setSelectionErrors((prev) => prev.map((err) => ({ ...err, show: err.label === 'priority' && false })))
  }

  return (
    <div
      ref={prioritySelectionRef}
      onClick={handleClickedSelection}
      className="flex flex-col gap-2 w-full relative cursor-pointer"
    >
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
        <KeyboardArrowDownOutlined className="absolute top-[40px] right-3 text-slate-400" />
      </div>
    </div>
  )
}

function TaskInput({ register, errors }: { register: UseFormRegister<FormData>; errors: FieldErrors<FormData> }) {
  const {
    selectedIconObject: { selectedIcon },
    openIconWindowObject: { setOpenIconWindow },
  } = useContextApp()

  return (
    <div className="flex flex-col gap-2">
      <span className="text-[14px] font-medium text-slate-600">Task Name</span>
      <div className="flex gap-3 justify-between">
        <div className="w-full">
          <input
            type="text"
            {...register('taskName')}
            placeholder="Enter Task Name..."
            className="p-[10px] text-[13px] w-full rounded-md border outline-none"
          />
          {errors.taskName && <p className="text-[11px] mt-2 text-red-500">{errors.taskName.message}</p>}
        </div>

        <div onClick={() => setOpenIconWindow(true)} className=""></div>
      </div>
    </div>
  )
}
