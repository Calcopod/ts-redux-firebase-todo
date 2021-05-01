import React from 'react'
import AddTodo from '../../Components/add-todo/add-todo.component'
import TodoContainer from '../../Components/todo-container/todo-cont.component'
import { signOut } from '../../Firebase/firebase.conf'
import './homepage.styles.scss'

const Homepage = () => (
  <div className="app">
    <div className='header'>
      <button onClick={signOut}>SIGN OUT</button>
    </div>

    <div className='main'>
      <TodoContainer />
    </div>

    <AddTodo />
  </div>
)

export default Homepage