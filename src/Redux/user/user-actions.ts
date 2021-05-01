import { Action, TYPES } from "../redux-types";
import { userInterface } from "./user-interfaces";

export const SetCurrentUser = (newUser: userInterface): Action => ({
  type: TYPES.SET_CURRENT_USER,
  payload: newUser
})