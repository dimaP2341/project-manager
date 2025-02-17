import React from 'react'
import { Priority, useTaskFormContext } from '../../Windows/TasksWindow'

export default function PriorityListComponent() {
    const {
        priorityListObject: {priorityList, setPriorityList}
    } = useTaskFormContext()

  return (
    <div className='flex flex-col gap-2'>
      {priorityList.map((singlePriority, index) => (
        <SinglePriority key={index} singlePriority={singlePriority} index={index} />
      ))}
    </div>
  )
}

function SinglePriority({singlePriority, index}: {singlePriority: Priority, index: number}) {
    const {setPriority, setOpenTasksDropDown} = useTaskFormContext()

    function updateThePriority(index: number) {
        setPriority(singlePriority)
        setPriorityList((prev) => prev.map((sPriority, i)) => ({
            ...sPriority,
            isSelected: index === i,
        }))

        setOpenTasksDropDown(false)
    }

    return <div onClick={() => updateThePriority(index)} className={`${singlePriority.isSelected && "bg-orange-50 border border-royal-blue-200"} flex items-center gap-2 p-[7px] rounded-md cursor-pointer`}>
        <div>{singlePriority.icon}</div>
        <p className='text-slate-500 hover:text-royal-blue-600 text-[14px]'>{singlePriority.name}</p>
    </div>
}