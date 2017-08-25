import axios from "axios";
import { STUY_SPEC_API_URL, STUY_SPEC_API_HEADER } from "../../constants";
import * as t from "./actionTypes";

export const fetchSections = () => {
  return dispatch => {
    dispatch({ type: t.FETCH_SECTIONS_PENDING });
    axios.get(`${STUY_SPEC_API_URL}/sections`, STUY_SPEC_API_HEADER)
      .then(response => {
        dispatch({
          type: t.FETCH_SECTIONS_FULFILLED,
          payload: response,
        });
      })
      .catch(err => {
        dispatch({
          type: t.FETCH_SECTIONS_REJECTED,
          payload: err,
        })
      });
  };
};

export const createSection = values => {
  return dispatch => {
    dispatch({ type: t.CREATE_SECTION_PENDING });
    axios.post(`${STUY_SPEC_API_URL}/sections`, values, STUY_SPEC_API_HEADER)
      .then(response => {
        dispatch({
          type: t.CREATE_SECTION_FULFILLED,
          payload: response,
        });
      })
      .catch(err => {
        dispatch({
          type: t.CREATE_SECTION_REJECTED,
          payload: err,
        })
      });
  };
};