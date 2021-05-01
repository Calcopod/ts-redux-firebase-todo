import { TYPES, Action } from '../redux-types'
import { todoInterface } from './todo-interfaces'

export interface todoReducerInitState {
  todosList: todoInterface[]
}

const initialState = {
  todosList: []
}

const todosReducer = (state: todoReducerInitState = initialState, action: Action) => {
  switch( action.type ) {
    case TYPES.SET_TODOS:
      return ({
        ...state,
        todosList: action.payload
      })
    default:

      return state
  }
}

export default todosReducer