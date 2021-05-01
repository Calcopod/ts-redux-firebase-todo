import { todoInterface } from './todo-interfaces'
import { TYPES } from '../redux-types'

export const SetTodos = (todos: todoInterface[]) => ({
  type: TYPES.SET_TODOS,
  payload: todos
})