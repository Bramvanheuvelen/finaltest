import {FETCH_BATCH} from '../actions/batches'

export default function (state = null, action) {
  switch (action.type) {
  case FETCH_BATCH:
    return action.payload

  // case DELETE_STUDENT:
  //   return [...state]

  default:
    return state
  }
}