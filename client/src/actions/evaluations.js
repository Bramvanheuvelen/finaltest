import * as request from "superagent";

export const FETCHED_ALL_EVALUATIONS = 'FETCHED_ALL_EVALUATIONS'
export const FETCH_EVALUATION = 'FETCH_EVALUATION'
export const ADD_EVALUATION = 'ADD_EVALUATION'

const baseUrl = "http://localhost:4000"


export const fetchAllEvaluations = () => (dispatch, getState) => {
  const state = getState()
  if (!state.currentUser) return null
  const jwt = state.currentUser.jwt

  request
    .get(`${baseUrl}/evaluation`)
    .set('Authorization', `Bearer ${jwt}`)
    .then(result =>
      dispatch({
        type: FETCHED_ALL_EVALUATIONS,
        payload: result.body.entity
      })
    )
    .catch(err => alert(err));
};

export const addEvaluation = (evaluation) => (dispatch) => {
  request
    .post(`${baseUrl}/evaluation`)
    .send(evaluation)
    .then(response => dispatch({
      type: ADD_EVALUATION,
      payload: response.body.entity
    }))
}

export const fetchEvaluation = (id) => (dispatch, getState) => {
  const state = getState()
  if (!state.currentUser) return null
  const jwt = state.currentUser.jwt

  request
    .get(`${baseUrl}/evaluation/${id}`)
    .set('Authorization', `Bearer ${jwt}`)
    .then(response => dispatch({
      type: FETCH_EVALUATION,
      payload: response.body
    }))
    .catch(err => alert(err))
}
  

