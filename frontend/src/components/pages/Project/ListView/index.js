import React from 'react'
import { getVisibleFromTasksById, getNumTaskOfStatus } from './../selectors'
import TaskListItem from './TaskListItem'
import Header from './Header'
import Navigation from './Navigation'
import PropTypes from 'prop-types'

const ListView = ({ project, tasksById, visibilityFilter }) => (
  <div>
    <Header
      project={project}
      current={getNumTaskOfStatus('done', tasksById)}
      max={getNumTaskOfStatus('all', tasksById)}
    />
    <Navigation project={project} tasksById={tasksById} />
    {getVisibleFromTasksById(visibilityFilter, tasksById).map(
      (task, key) =>
        console.log('rerender') || <TaskListItem task={task} key={key} />
    )}
  </div>
)

ListView.propTypes = {
  project: PropTypes.object.isRequired,
  visibilityFilter: PropTypes.string.isRequired,
  tasksById: PropTypes.object
}

export default ListView
