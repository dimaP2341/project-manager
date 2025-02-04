import { useContextApp } from '@/app/contextApp'
import { allIconsArray } from '@/app/Data/AllIcons'
import { addNewProject } from '@/app/Functions/projectsActions'
import AllProjects from '@/app/Pages/allProjects/AllProjects'
import { zodResolver } from '@hookform/resolvers/zod'
import BorderAllOutlined from '@mui/icons-material/BorderAllOutlined'
import CloseOutlined from '@mui/icons-material/CloseOutlined'
import LibraryBooksOutlined from '@mui/icons-material/LibraryBooksOutlined'
import React, { useContext, useEffect, useLayoutEffect, useState } from 'react'
import { FieldErrors, SubmitHandler, UseFormRegister, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { z } from 'zod'

const schema = z.object({
  projectName: z
    .string()
    .min(1, { message: 'Project name is required' })
    .max(30, 'Project name must be 30 characters or less'),
})

type FormData = z.infer<typeof schema>

export default function ProjectWindow() {
  const {
    openProjectWindowObject: { openProjectWindow, setOpenProjectWindow },
    allProjectsObject: { allProjects, setAllProjects },
    selectedIconObject: { selectedIcon, setSelectedIcon },
    selectedProjectObject: {selectedProject}
  } = useContextApp()

  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    setValue,
    setError,
    setFocus,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(schema),
  })

  const onSubmit: SubmitHandler<FormData> = (data: FormData) => {
    const existingProject = AllProjects.find(
      (project) => project.title.toLowerCase() === data.projectName.toLowerCase(),
    )

    if (existingProject) {
      setError('projectName', {
        type: 'manual',
        message: 'Project already exists',
      })

      setFocus('projectName')
    } else {
      projectsFunction(data)
    }
  }

  async function projectsFunction(data: FormData) {
    try {
      setIsLoading(false)

      await new Promise((res) => setTimeout(res, 1000))

      addNewProject(data, allProjects, setAllProjects, setOpenProjectWindow, selectedIcon, reset)
    } catch (err) {
      console.log(err)
      toast.error("Something went wrong")
    } finally {
      setIsLoading(false)
      toast.success("Project added successfully")
    }
  }

  const handleClose = () => {
    console.log('Closing window and resetting form')
    reset()
  }

  useLayoutEffect(() => {
    if (openProjectWindow) {
      if(!selectedProject) {
        reset()
      } else {
        setValue("ProjectName", selectedProject.title)

        const findIconInAllIconsArray = allIconsArray.find((icon) => icon.name === selectedProject.icon)
        if (findIconInAllIconsArray) {
          setSelectedIcon(findIconInAllIconsArray)
        }
      }
    }
  }, [openProjectWindow, reset])

  return (
    <div
      className={`${
        openProjectWindow ? 'block' : 'hidden'
      } w-[48%] max-sm:w-[82%] max-[600px]:w-[93%] z-[80] p-3 left-1/2 top-[47%] -translate-y-1/2 -translate-x-1/2 absolute flex flex-col gap-3 border border-slate-50 bg-white rounded-lg shadow-md`}
    >
      <Header handleClose={handleClose} />
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2 pt-8 px-7 mt-3">
        <ProjectInput register={register} errors={errors} />
        <Footer handleClose={handleClose} isLoading={isLoading} />
      </form>
    </div>
  )
}

function Header({ handleClose }: { handleClose: () => void }) {
  const {
    selectedProjectObject: {selectedProject}
  } = useContextApp()

  return (
    <div className="flex justify-between items-center pt-7 px-7">
      <div className="flex items-center gap-2">
        <div className="p-[7px] bg-orange-200 rounded-lg flex items-center justify-center">
          <BorderAllOutlined sx={{fontSize: '21px'}} className='text-orange-600' />
        </div>
        <span className="font-semibold text-lg">{selectedProject ? "Edit Project" : "New Project"}</span>
      </div>

      <CloseOutlined
        sx={{ fontSize: '18px' }}
        className="text-slate-300 cursor-pointer"
        onClick={() => {
          handleClose()
        }}
      />
    </div>
  )
}

function ProjectInput({ register, errors }: { register: UseFormRegister<FormData>; errors: FieldErrors<FormData> }) {
  const {
    openProjectWindowObject: { openProjectWindow },
  } = useContextApp()

  useEffect(() => {
    if (openProjectWindow) {
      const inputElement = document.querySelector<HTMLImageElement>('input[name="projectName"]')
      if (inputElement) {
        inputElement.focus()
      }
    }
  }, [openProjectWindow])

  return (
    <div className="flex flex-col gap-2 ">
      <span className="text-[14px] font-medium text-slate-600">Project Name</span>
      <div className="flex gap-3 justify-between">
        <div className="w-full">
          <input
            {...register('projectName')}
            type="text"
            placeholder="Enter Project Name..."
            className="p-[10px] text-[13px] w-full rounded-md border outline-none"
          />
          {errors.projectName && <p className="text-[11px] mt-2 text-red-500">{errors.projectName.message}</p>}
        </div>
        <div className="w-12 h-10 text-white flex items-center justify-center bg-orange-600 rounded-lg cursor-pointer">
          <LibraryBooksOutlined />
        </div>
      </div>
    </div>
  )
}

function Footer({ handleClose, isLoading }: { handleClose: () => {}, isLoading: boolean }) {
  const {
    selectedIconObject: {setSelectedIcon},
    selectedProjectObject: {selectedProject, setSelectedProject}
  } = useContextApp()

  return (
    <div className="w-[102%] p-[12px] mt-8 mb-4 flex gap-3 justify-end items-center">
      <button
        type="button"
        onClick={() => {
          handleClose()
          setSelectedProject(null)
          setSelectedIcon(null)
        }}
        className="border border-slate-200 text-slate-400 text-[13px] p-2 px-6 rounded-md hover:border-slate-300 transition-all"
      >
        Cancel
      </button>
      <button
        type="submit"
        className="bg-orange-600 hover:bg-orange-700 text-white text-[13px] p-2 px-4 rounded-md transition-all"
      >
        {isLoading ? "Saving..." : selectedProject ? "Edit Project" : "Add Project"}
      </button>
    </div>
  )
}
