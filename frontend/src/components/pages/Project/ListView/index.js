import React from 'react'
import { getNumTaskOfStatus, getProjectTasks, showAll } from './../selectors'
import TaskListItem from './TaskListItem'
import Header from './Header'
import Navigation from './Navigation'
import PropTypes from 'prop-types'
import { SortableContainer, arrayMove } from 'react-sortable-hoc'
import styled from 'styled-components'
import { changeTaskPriority } from './../../../../actions/task'
import { connect } from 'react-redux'

const Wrapper = styled.div`
  padding: 0 2em;
  display: flex;
  flex-flow: column;
  height: calc(100vh - 56px);
  @media (max-width: 380px) {
    padding: 0 1em;
  }
`

const Ul = styled.ul`
  list-decoration: none;
  margin: 0;
  padding: 0;
  overflow-y: scroll;
  flex: 2;
  @media (max-width: 380px) {
    -webkit-overflow-scrolling: touch;
  }
`

const TaskList = SortableContainer(({ visibilityFilter, tasks }) => (
  <Ul>
    {tasks.map(
      (task, key) =>
        showAll(visibilityFilter) || task.status === visibilityFilter ? (
          key < tasks.length - 1 ? (
            <TaskListItem task={task} key={key} index={key} />
          ) : (
            <TaskListItem
              task={task}
              key={key}
              index={key}
              style={{ marginBottom: '1em' }}
            />
          )
        ) : null
    )}
  </Ul>
))

class ListView extends React.Component {
  state = {
    tasks: getProjectTasks(this.props.tasksById).sort(
      (a, b) => a.priority - b.priority
    )
  }

  componentWillReceiveProps (props) {
    this.setState(() => ({
      tasks: getProjectTasks(props.tasksById).sort(
        (a, b) => a.priority - b.priority
      )
    }))
  }

  onSortEnd = ({ oldIndex, newIndex }) => {
    const newOrder = arrayMove(this.state.tasks, oldIndex, newIndex)
    this.setState(() => ({ tasks: newOrder }))
    this.props.updateTaskOrder(this.props.token, newOrder)
  }

  render () {
    const { project, tasksById } = this.props
    const tasks = this.state.tasks

    return (
      <Wrapper>
        <Header
          project={project}
          current={getNumTaskOfStatus('done', tasksById)}
          max={getNumTaskOfStatus('all', tasksById)}
        />
        <Navigation project={project} tasksById={tasksById} />
        <TaskList
          helperClass={'grabbing'}
          visibilityFilter={this.props.visibilityFilter}
          pressDelay={100}
          tasks={tasks}
          onSortEnd={this.onSortEnd}
        />
      </Wrapper>
    )
  }
}

ListView.propTypes = {
  project: PropTypes.object.isRequired,
  visibilityFilter: PropTypes.string.isRequired,
  updateTaskOrder: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
  tasksById: PropTypes.object
}

const mapToProps = state => ({ token: state.user.token })

const mapToDispatch = dispatch => ({
  updateTaskOrder: (token, tasks) => dispatch(changeTaskPriority(token, tasks))
})

export default connect(mapToProps, mapToDispatch)(ListView)
