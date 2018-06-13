import * as request from "superagent";

export const FETCH_BATCH = "FETCH_BATCH";
export const ADD_BATCH = "ADD_BATCH";

const baseUrl = "http://localhost:4000";

export const fetchBatch = batchId => dispatch => {
  request
    .get(`${baseUrl}/batches/${batchId}`)
    .then(response =>
      dispatch({
        type: FETCH_BATCH,
        payload: response.body
      })
    )
    .catch(err => alert(err));
};

export const addBatch = batch => (dispatch, getState) => {
  const state = getState()
  if (!state.currentUser) return null
  const jwt = state.currentUser.jwt

  request
    .post(`${baseUrl}/batches`)
    .set('Authorization', `Bearer ${jwt}`)
    .send(batch)
    .then(response =>
      dispatch({
        type: ADD_BATCH,
        payload: response.body
      })
    );
};
