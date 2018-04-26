import React from 'react'
import TaskField from './../form/TaskField'
import { connect } from 'react-redux'
import { getProjectTasks } from './../../selectors'
import TaskListItem from './../Task/TaskListItem'

const Project = ({ project, tasksById }) =>
  console.log(getProjectTasks(tasksById)) || (
    <div>
      {getProjectTasks(tasksById).map((task, key) => (
        <TaskListItem task={task} key={key} />
      ))}
      <TaskField parent={{ type: 'project', id: project.id }} />
    </div>
  )

const mapToProps = (state, props) => ({
  project: state.projects.projectsById[props.match.params.id],
  tasksById: state.tasks.groupedByParent[props.match.params.id]
})

export default connect(mapToProps)(Project)
