import * as request from "superagent";

export const FETCHED_ALL_STUDENTS = 'FETCHED_ALL_STUDENTS'
export const FETCH_STUDENT = 'FETCH_STUDENT'
export const ADD_STUDENT = 'ADD_STUDENT'

const baseUrl = "http://localhost:4000"


export const fetchAllStudents = () => (dispatch, getState) => {
    const state = getState()
    if (!state.currentUser) return null
    const jwt = state.currentUser.jwt
  
    request
      .get(`${baseUrl}/students`)
      .set('Authorization', `Bearer ${jwt}`)
      .then(result =>
        dispatch({
          type: FETCHED_ALL_STUDENTS,
          payload: result.body.entity
        })
      )
      .catch(err => alert(err));
  };

export const fetchStudent = (id) => (dispatch, getState) => {
    const state = getState()
    if (!state.currentUser) return null
    const jwt = state.currentUser.jwt
  
      request
      .get(`${baseUrl}/students/${id}`)
      .set('Authorization', `Bearer ${jwt}`)
      .then(response => dispatch({
        type: FETCH_STUDENT,
        payload: response.body
      }))
      .catch(err => alert(err))
      }

export const createStudent = (student) => (dispatch) => {
        request
          .post(`${baseUrl}/students`)
          .send(student)
          .then(response => dispatch({
            type: ADD_STUDENT,
            payload: response.body.entity
          }))
      }