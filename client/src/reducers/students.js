import {FETCHED_ALL_STUDENTS, ADD_STUDENT, UPDATE_STUDENT, ADD_EVALUATION } from '../actions/students'

export default function(state = [], action ) {
  switch (action.type) {
  case FETCHED_ALL_STUDENTS:
    return action.payload
        
  case ADD_STUDENT:
    return [...state, action.payload]

  case UPDATE_STUDENT:
    return state.map(student => {
      if (student.id === action.payload.id) {
        return action.payload
      }
      else return student
    })

  case ADD_EVALUATION:
    return state.map(student => {
      if (student.id === action.payload.id) {
        return action.payload
      }
      else return student
    })
        
  default: 
    return state
  } 
}
