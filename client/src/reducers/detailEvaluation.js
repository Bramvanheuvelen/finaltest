import {FETCH_EVALUATION} from '../actions/evaluations'

export default function (state = null, action) {
  switch (action.type) {
  case FETCH_EVALUATION:
    return action.payload

  default:
    return state
  }
}