import React from 'react'
import { connect } from 'react-redux'
import { firestore } from '../../Firebase/firebase.conf'
import { storeInterface } from '../../Redux/root-reducer'
import './add-todo.styles.scss'

interface AddTodoProps {
  currentUserUID?: string
}

interface AddTodoState {
  title: string, 
  desc: string
}

class AddTodo extends React.Component<AddTodoProps, AddTodoState> {
  constructor( props: any ) {
    super( props )

    this.state = {
      title: '',
      desc: ''
    }
  }

  handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    const { name, value } = event.currentTarget

    // @ts-ignore
    this.setState({ [name]: value })
  }

  handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault()

    const { currentUserUID } = this.props

    const todoRef = firestore.collection(`/todos/${currentUserUID}/docs`)
    await todoRef.add({
      title: this.state.title,
      desc: this.state.desc
    })

    // Reset forms:
    this.setState({ title: '', desc: '' })
  }

  render() {
    return (
      <div className='add-todo'>
        <form className='form' onSubmit={this.handleSubmit}>
          <input 
            className='title' 
            value={this.state.title} 
            name='title'
            onChange={this.handleChange}
          />
          <label>Title</label>

          <input 
            className='desc' 
            value={this.state.desc} 
            name='desc'
            onChange={this.handleChange}
          />
          <label>Description</label>

          <button type='submit'>CREATE TODO</button>
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state: storeInterface) => ({
  currentUserUID: state.user.currentUser?.uid
})

export default connect(mapStateToProps)(AddTodo)