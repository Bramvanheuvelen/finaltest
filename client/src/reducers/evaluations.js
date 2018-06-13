import {FETCHED_ALL_EVALUATIONS, ADD_EVALUATION} from '../actions/evaluations'

export default function(state = [], action ) {
  switch (action.type) {
  case FETCHED_ALL_EVALUATIONS:
    return action.payload
        
  case ADD_EVALUATION:
    return [...state, action.payload]
        
  default: 
    return state
  } 
}
