import axios from "axios";
import { STUY_SPEC_API_URL, STUY_SPEC_API_HEADERS } from "../../constants";
import * as t from "./actionTypes";

export const fetchUsers = () => {
  return dispatch => {
    dispatch({ type: t.FETCH_USERS_PENDING });
    axios.get(`${STUY_SPEC_API_URL}/users`, STUY_SPEC_API_HEADERS)
      .then(response => {
        dispatch({
          type: t.FETCH_USERS_FULFILLED,
          payload: response.data,
        });
      })
      .catch(err => {
        dispatch({
          type: t.FETCH_USERS_REJECTED,
          payload: err,
        })
      });
  };
};

export const createUser = values => {
  return dispatch => {
    dispatch({
      type: t.CREATE_USER_PENDING,
      payload: values,
    });
    axios.post(`${STUY_SPEC_API_URL}/auth/`, values, STUY_SPEC_API_HEADERS)
      .then(response => {
        dispatch({
          type: t.CREATE_USER_FULFILLED,
          payload: response,
        });
        const user = response.data.data;
        dispatch({
          type: t.UPDATE_USER_PENDING,
          payload: user,
        });
        axios.put(`${STUY_SPEC_API_URL}/users/${user.id}`, values, STUY_SPEC_API_HEADERS)
          .then(response => {
            dispatch({
              type: t.UPDATE_USER_FULFILLED,
              payload: response,
            });
          })
          .catch(err => {
            dispatch({
              type: t.UPDATE_USER_REJECTED,
              payload: err,
            });
          });
      })
      .catch(err => {
        dispatch({
          type: t.CREATE_USER_REJECTED,
          payload: err,
        })
      });
  };
};

export const deleteUser = values => {
  values.id = values.slug.split('-')[ 1 ];
  return dispatch => {
    dispatch({
      type: t.DELETE_USER_PENDING,
      payload: values,
    });
    axios.delete(`${STUY_SPEC_API_URL}/users/${values.id}`, STUY_SPEC_API_HEADERS)
      .then(response => {
        dispatch({
          type: t.DELETE_USER_FULFILLED,
          payload: response,
        });
      })
      .catch(err => {
        dispatch({
          type: t.DELETE_USER_REJECTED,
          payload: err,
        })
      });
  };
};