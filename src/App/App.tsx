import React, { Component } from 'react';
import { connect } from 'react-redux';
import { auth, createUserProfile, createUserTodos, firestore, signInWithGoogle } from '../Firebase/firebase.conf';
import Homepage from '../Pages/Homepage/homepage.component';
import { SetTodos } from '../Redux/todos/todo-actions';
import { todoInterface } from '../Redux/todos/todo-interfaces';
import { SetCurrentUser } from '../Redux/user/user-actions';
import { userInterface } from '../Redux/user/user-interfaces';

import './App.css';

interface AppProps {
  currentUser: userInterface,
  setTodos: Function,
  setCurrentUser: Function
}

class App extends Component<AppProps, {}> {
  unsubscribeFromAuth: any = null;
  unsubscribeFromTodos: any = null;

  componentDidMount() {
    const { setTodos, setCurrentUser } = this.props

    // Update user
    this.unsubscribeFromAuth = auth.onAuthStateChanged( async user => {
      createUserProfile( user, {} );
      createUserTodos( user )

      // @ts-ignore
      if( user ) {
        const { displayName, email, uid } = user

        // Update user:
        setCurrentUser({
          displayName,
          email,
          uid
        })

        // Update todos:
        try {
          const todosRef = firestore.collection(`todos/${uid}/docs`)

          this.unsubscribeFromTodos = todosRef.onSnapshot( todosSnapshot => {
            const returnArray: todoInterface[] = []
            
            todosSnapshot.docs.map( async doc => {
              const { title, desc } = doc.data()
              const id = doc.id
              returnArray.push({
                title,
                desc,
                id
              }) 
            })

            setTodos( returnArray )
          })
    
        } catch( error ) {
          console.error('Error in loading users todos: ', error)
        }
      }
      else
        setCurrentUser(null)
    })
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth()
    this.unsubscribeFromTodos()
  }

  render() {
    const { currentUser } = this.props

    return (
      <div>
        {
          currentUser ? 
          <Homepage /> 
          :
          <button onClick={signInWithGoogle}>SIGN IN</button>
        }
      </div>
    );
  }
}

const mapStateToProps = (state: any) => ({
  currentUser: state.user.currentUser
})

const mapDispatchToProps = (dispatch: any) => ({
  setCurrentUser: ( user: userInterface ) => dispatch( SetCurrentUser( user ) ),
  setTodos: ( todos: todoInterface[] ) => dispatch( SetTodos( todos ) )
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
