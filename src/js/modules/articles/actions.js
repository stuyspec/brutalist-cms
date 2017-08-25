import axios from "axios";
import { STUY_SPEC_API_URL, STUY_SPEC_API_HEADERS } from "../../constants";
import * as t from "./actionTypes";

export const fetchArticles = () => {
  return dispatch => {
    dispatch({ type: t.FETCH_ARTICLES_PENDING });
    axios.get(`${STUY_SPEC_API_URL}/articles`, STUY_SPEC_API_HEADERS)
      .then(response => {
        dispatch({
          type: t.FETCH_ARTICLES_FULFILLED,
          payload: response.data,
        });
      })
      .catch(err => {
        dispatch({
          type: t.FETCH_ARTICLES_REJECTED,
          payload: err,
        })
      });
  };
};

export const createArticle = values => {
  return dispatch => {
    dispatch({
      type: t.CREATE_ARTICLE_PENDING,
      payload: values,
    });
    values.section = values.section.value;
    /* TODO: put this code in when section becomes section_id on Rails POST.
     * values.sectionId = values.section.value;
     * delete values.section;
     */
    axios.post(
      `${STUY_SPEC_API_URL}/articles`,
      values,
      STUY_SPEC_API_HEADERS
    )
      .then(response => {
        dispatch({
          type: t.CREATE_ARTICLE_FULFILLED,
          payload: response,
        });
      })
      .catch(err => {
        dispatch({
          type: t.CREATE_ARTICLE_REJECTED,
          payload: err,
        })
      });
  };
};