// TODO: delete authorships when a user is deleted.

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

export const fetchAuthorships = () => {
  return dispatch => {
    dispatch({ type: t.FETCH_AUTHORSHIPS_PENDING });
    axios.get(`${STUY_SPEC_API_URL}/authorships`, STUY_SPEC_API_HEADERS)
      .then(response => {
        dispatch({
          type: t.FETCH_AUTHORSHIPS_FULFILLED,
          payload: response.data,
        });
      })
      .catch(err => {
        dispatch({
          type: t.FETCH_AUTHORSHIPS_REJECTED,
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
    values.sectionId = values.section.value;
    delete values.section;
    axios.post(`${STUY_SPEC_API_URL}/articles`, values, STUY_SPEC_API_HEADERS)
      .then(response => {
        dispatch({
          type: t.CREATE_ARTICLE_FULFILLED,
          payload: response,
        });
        const article = response.data;
        // featured media
        dispatch({
          type: t.CREATE_ARTICLE_MEDIA_PENDING,
          payload: values,
        });
        axios.post(
          `${STUY_SPEC_API_URL}/media`,
          { ...values, isFeatured: true, userId: values.creator.value },
          STUY_SPEC_API_HEADERS
        )
          .then(response => {
            dispatch({
              type: t.CREATE_ARTICLE_MEDIA_FULFILLED,
              payload: response,
            });
          })
          .catch(err => {
            dispatch({
              type: t.CREATE_ARTICLE_MEDIA_REJECTED,
              payload: err,
            });
          });

        values.users.map(user => {
          dispatch({
            type: t.CREATE_AUTHORSHIP_PENDING,
            payload: user,
          });
          axios.post(
            `${STUY_SPEC_API_URL}/authorships`,
            { articleId: article.id, userId: user.value },
            STUY_SPEC_API_HEADERS
          )
            .then(response => {
              dispatch({
                type: t.CREATE_AUTHORSHIP_FULFILLED,
                payload: response,
              });

            })
            .catch(err => {
              dispatch({
                type: t.CREATE_AUTHORSHIP_REJECTED,
                payload: err,
              });
            });
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

export const deleteArticle = values => {
  return dispatch => {
    dispatch({
      type: t.DELETE_ARTICLE_PENDING,
      payload: values,
    });
    axios.delete(`${STUY_SPEC_API_URL}/articles/${values.slug}`, STUY_SPEC_API_HEADERS)
      .then(response => {
        dispatch({
          type: t.DELETE_ARTICLE_FULFILLED,
          payload: response,
        });
      })
      .catch(err => {
        dispatch({
          type: t.DELETE_ARTICLE_REJECTED,
          payload: err,
        })
      });
  };
};