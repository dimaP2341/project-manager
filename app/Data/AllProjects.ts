import { v4 as uuidv4 } from 'uuid'

export type Task = {
  id: string
  title: string
  icon: string
  projectName: string
  status: 'In progress' | 'Completed'
  priority: 'Low' | 'Medium' | 'High'
  createdAt: string
  updatedAt: string
}

export type Project = {
  id: string
  clerkUserId: string
  title: string
  createdAt: string
  updatedAt: string
  icon: string

  tasks: Task[]
}

export const projectsData: Project[] = [
  {
    id: uuidv4(),
    clerkUserId: '123',
    title: 'Web Application Development',
    createdAt: '2024-08-26T10:00:00Z',
    updatedAt: '2024-08-26T14:30:00Z',
    icon: 'Code',
    tasks: [
      {
        id: uuidv4(),
        title: 'Set up the project repository',
        icon: 'Folder',
        projectName: 'Web Application Development',
        status: 'Completed',
        priority: 'High',
        createdAt: '2024-08-25T09:00:00Z',
        updatedAt: '2024-08-25T12:00:00Z',
      },
      {
        id: uuidv4(),
        title: 'Design the landing page',
        icon: 'Brush',
        projectName: 'Web Application Development',
        status: 'In progress',
        priority: 'Medium',
        createdAt: '2024-08-26T08:00:00Z',
        updatedAt: '2024-08-26T14:00:00Z',
      },
    ],
  },
  {
    id: uuidv4(),
    clerkUserId: '124',
    title: 'Mobile App Launch',
    createdAt: '2024-09-01T12:00:00Z',
    updatedAt: '2024-09-05T16:00:00Z',
    icon: 'Smartphone',
    tasks: [
      {
        id: uuidv4(),
        title: 'Create app wireframes',
        icon: 'InsertChart',
        projectName: 'Mobile App Launch',
        status: 'In progress',
        priority: 'High',
        createdAt: '2024-09-01T13:00:00Z',
        updatedAt: '2024-09-02T10:00:00Z',
      },
      {
        id: uuidv4(),
        title: 'Set up Firebase authentication',
        icon: 'Lock',
        projectName: 'Mobile App Launch',
        status: 'In progress',
        priority: 'Medium',
        createdAt: '2024-09-03T09:00:00Z',
        updatedAt: '2024-09-03T11:30:00Z',
      },
    ],
  },
  {
    id: uuidv4(),
    clerkUserId: '125',
    title: 'Marketing Campaign',
    createdAt: '2024-07-15T08:00:00Z',
    updatedAt: '2024-07-20T15:00:00Z',
    icon: 'Campaign',
    tasks: [
      {
        id: uuidv4(),
        title: 'Draft social media content',
        icon: 'Chat',
        projectName: 'Marketing Campaign',
        status: 'Completed',
        priority: 'Low',
        createdAt: '2024-07-15T10:00:00Z',
        updatedAt: '2024-07-15T12:00:00Z',
      },
      {
        id: uuidv4(),
        title: 'Launch Google Ads campaign',
        icon: 'AdsClick',
        projectName: 'Marketing Campaign',
        status: 'In progress',
        priority: 'High',
        createdAt: '2024-07-16T11:00:00Z',
        updatedAt: '2024-07-18T14:00:00Z',
      },
    ],
  },
]
