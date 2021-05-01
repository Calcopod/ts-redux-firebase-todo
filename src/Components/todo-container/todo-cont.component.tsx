import React, { FunctionComponent } from 'react'
import { connect } from 'react-redux'
import { todoInterface } from '../../Redux/todos/todo-interfaces'
import TodoItem from '../todo-item/todo-item.component'
import { storeInterface } from '../../Redux/root-reducer'
import './todo-comp.styles.scss'

interface TodosProps {
  todos?: todoInterface[]
}

const TodoContainer: FunctionComponent<TodosProps> = ( { todos } ) => {
  return (
    <div className='todo-container'>
      {
        todos?.map( ( {title, desc, id}) => (
          <TodoItem title={title} desc={desc} id={id} key={id} />
        ))
      }
    </div>
  )
}

const mapStateToProps = (state: storeInterface) => ({
  todos: state.todos.todosList
})

export default connect(mapStateToProps, null)(TodoContainer);