import { Project } from '@/app/Data/AllProjects'
import { useContextApp } from '@/app/contextApp'
import SplitscreenOutlined from '@mui/icons-material/SplitscreenOutlined'
import React, { useMemo } from 'react'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'

export default function StatsRightSideBar() {

  const {allProjectsObject: {allProjects}} = useContextApp()

  const {completedProjects, completedTasks, completionPercentage} = useMemo(() => {
    let completedProjects: Project[] = [];
    let totalTasks = 0;
    let completedTasks = 0;

    allProjects.forEach((project) => {
      const projectCompeleted = project.tasks.every((task) => task.status === "Completed")
      if (projectCompeleted) completedProjects.push(project)

      project.tasks.forEach((task) => {
        totalTasks++;
        if (task.status === "Completed") completedTasks++;
      })
    })

    const percentage = completedProjects.length > 0 ? Math.round((completedProjects.length / allProjects.length) * 100) : 0

    return {
      completedProjects,
      completedTasks,
      completionPercentage: percentage
    }
  }, [allProjects])

  return (
    <div className="w-[22%] flex justify-end items-center border max-lg:hidden">
      <div className="h-[92%] w-[94%] bg-white rounded-3xl p-3 mr-3 border flex flex-col">
        <Header />
        <div className="flex flex-col gap-11 items-center justify-center mt-6">
          <CircleChart percentage={completionPercentage} />
          <ProjectsCompletedLabels completedProjects={completedProjects} completedTasks={completedTasks} />
        </div>
        <ProjectsList completedProjects={completedProjects} />
      </div>
    </div>
  )
}

function Header() {
  return <h2 className="text-[22px] font-bold text-center mt-7">Projects Completed</h2>
}

function CircleChart({percentage}: {percentage: number}) {
  return (
    <div className="w-40 h-40 mt-7 mb-1">
      <CircularProgressbar value={percentage} text={`${percentage}%`} styles={buildStyles({
        textSize: '16px',
        pathColor: `rgba(234, 88, 12, 2)`,
        textColor: "#f97316",
        trailColor: "#f1f5f9",
        backgroundColor: "#3e98c7"
      })}/>
    </div>
  )
}

function ProjectsCompletedLabels({ completedProjects, completedTasks }: { completedProjects: Project[], completedTasks: number}) {
  return (
    <div className="flex justify-center flex-col gap-1 items-center">
      <p className="font-bold text-[17px]">{completedProjects.length} Completed</p>
      <p className="text-[13px] text-slate-400">{completedTasks} Tasks done</p>
    </div>
  )
}

function truncateString(str: string, maxLength: number): string {
  return str.length > maxLength ? str.slice(0, maxLength) + "..." : str;
}

function SingleProject({project}: {project: Project}) {
  return (
    <li className="p-3 flex gap-2 items-center">
      <div className="w-8 h-8 bg-orange-600 rounded-md justify-center items-center flex text-white">
        <SplitscreenOutlined sx={{ fontSize: '19px' }} />
      </div>

      <ul>
        <li className="text-[14px] font-semibold">{truncateString(project.title, 40)}</li>
        <li className="text-[12px] text-slate-400">{project.tasks.length} tasks</li>
      </ul>
    </li>
  )
}

function ProjectsList({completedProjects}: {completedProjects: Project[]}) {
  return (
    <ul className="flex flex-col gap-3 mt-16 mx-4 overflow-auto">
      {completedProjects.map((project, index) => (
        <div key={project.id}>
          <SingleProject project={project} />
          {index < completedProjects.length - 1 && (
            <hr className='w-[80%] mx-auto text-slate-100 opacity-50' />
          )}
        </div>
      ))}
    </ul>
  )
}
