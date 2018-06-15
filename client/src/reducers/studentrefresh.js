import {ADD_STUDENT, ACTION_NULL} from '../actions/batches'
import {DELETE_STUDENT} from '../actions/students'
import { ADD_EVALUATION } from '../actions/evaluations';

const initialState = null
export default function (state = initialState, {type}) {
  switch(type){
  case ADD_STUDENT:
    return true

  case DELETE_STUDENT:
    return true

  case ADD_EVALUATION:
    return true

  case ACTION_NULL:
    return null
  default: return state
  }
    
}