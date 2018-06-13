import * as request from "superagent";

export const FETCHED_ALL_BATCHES = 'FETCHED_ALL_BATCHES'
export const FETCH_BATCH = 'FETCH_BATCH'
export const ADD_BATCH = 'ADD_BATCH'

const baseUrl = "http://localhost:4000"


export const fetchAllBatches = () => (dispatch, getState) => {
  const state = getState()
  if (!state.currentUser) return null
  const jwt = state.currentUser.jwt

  request
    .get(`${baseUrl}/batches`)
    .set('Authorization', `Bearer ${jwt}`)
    .then(result =>
      dispatch({
        type: FETCHED_ALL_BATCHES,
        payload: result.body.entity
      })
    )
    .catch(err => alert(err));
};

export const createBatch = (batch) => (dispatch) => {
  request
    .post(`${baseUrl}/batches`)
    .send(batch)
    .then(response => dispatch({
      type: ADD_BATCH,
      payload: response.body.entity
    }))
}

export const fetchBatch = (id) => (dispatch, getState) => {
  const state = getState()
  if (!state.currentUser) return null
  const jwt = state.currentUser.jwt

    request
    .get(`${baseUrl}/batches/${id}`)
    .set('Authorization', `Bearer ${jwt}`)
    .then(response => dispatch({
      type: FETCH_BATCH,
      payload: response.body
    }))
    .catch(err => alert(err))
    }
  

