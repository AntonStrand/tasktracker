import React from 'react'
import { getVisibleFromTasksById } from './../../../../selectors'
import TaskListItem from './TaskListItem'
import Header from './Header'
import Navigation from './Navigation'

const ListView = ({ project, tasksById, visibilityFilter }) => (
  <div>
    <Header project={project} />
    <Navigation project={project} tasksById={tasksById} />
    {getVisibleFromTasksById(visibilityFilter, tasksById).map((task, key) => (
      <TaskListItem task={task} key={key} />
    ))}
  </div>
)

export default ListView
