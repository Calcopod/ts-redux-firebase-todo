import React, { FunctionComponent } from 'react'
import { connect } from 'react-redux'
import { firestore } from '../../Firebase/firebase.conf'
import { storeInterface } from '../../Redux/root-reducer'
import { todoInterface } from '../../Redux/todos/todo-interfaces'

import './todo-item.styles.scss'

const TodoItem: FunctionComponent< todoInterface & { currentUserUID?: string } > = ({ title, desc, id, currentUserUID }) => {
  const removeItem = () => {
    firestore.doc(`todos/${currentUserUID}/docs/${id}`).delete()
  }

  return (
    <div className='todo-item'>
      <div className="container">
        <h1 className='title'>{title}</h1>
        <span className="desc">{desc}</span>
      </div>
  
      <span className='delete-btn' onClick={ removeItem }>x</span>
    </div>
  )
}

const mapStateToProps = (state: storeInterface) => ({
  currentUserUID: state.user.currentUser?.uid
})

export default connect(mapStateToProps, null)(TodoItem)