import {FETCH_STUDENT, UPDATE_STUDENT} from '../actions/students'

export default function (state = null, action) {
  switch (action.type) {
  case FETCH_STUDENT:
    return action.payload

  case UPDATE_STUDENT:
    if (action.payload.id === state.id) {
      return action.payload
    }
    else return state

  default:
    return state
  }
}