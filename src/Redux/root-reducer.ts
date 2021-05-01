import { combineReducers } from 'redux'
import todosReducer, { todoReducerInitState } from './todos/todo-reducer'
import userReducer, { userReducerInitState } from './user/user-reducer';

export interface storeInterface {
  todos: todoReducerInitState,
  user: userReducerInitState
}

const rootReducer = combineReducers({
  todos: todosReducer,
  user: userReducer
})

export default rootReducer;