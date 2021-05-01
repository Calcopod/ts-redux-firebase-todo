import { Action, TYPES } from "../redux-types";
import { userInterface } from "./user-interfaces";

export interface userReducerInitState {
  currentUser: null | userInterface
}

const initialState = {
  currentUser: null
}

const userReducer = (state: userReducerInitState = initialState, action: Action) => {
  switch( action.type ) {
    case TYPES.SET_CURRENT_USER:
      return ({
        ...state,
        currentUser: action.payload
      })

    default:
      return state;
  }
}

export default userReducer