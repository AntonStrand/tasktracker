import React from 'react'
import { getProjectTasks } from './../selectors'
import TaskListItem from './TaskListItem'
import Header from './Header'
import Navigation from './Navigation'

const ListView = ({ project, tasksById }) => (
  <div>
    <Header project={project} />
    <Navigation project={project} tasksById={tasksById} />
    {getProjectTasks(tasksById).map((task, key) => (
      <TaskListItem task={task} key={key} />
    ))}
  </div>
)

export default ListView
