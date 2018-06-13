import {FETCHED_ALL_BATCHES, ADD_BATCH} from '../actions/batches'

export default function(state = [], action ) {
    switch (action.type) {
        case FETCHED_ALL_BATCHES:
            return action.payload
        
            case ADD_BATCH:
            return [...state, action.payload]
        
        default: 
            return state
    } 
}
