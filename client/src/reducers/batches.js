import {FETCHED_ALL_BATCHES, ADD_BATCH} from '../actions/batches'
import {DELETE_STUDENT} from '../actions/students'

export default function(state = [], action ) {
  switch (action.type) {
  case FETCHED_ALL_BATCHES:
    return action.payload
        
  case ADD_BATCH:
    return [...state, action.payload]

  case DELETE_STUDENT:
    return [state]
        
  default: 
    return state
  } 
}
