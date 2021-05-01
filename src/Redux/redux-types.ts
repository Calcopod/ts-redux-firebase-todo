export enum TYPES {
  SET_TODOS,
  SET_CURRENT_USER
}

export interface Action {
  type: TYPES,
  payload: any
}