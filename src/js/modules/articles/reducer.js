import {
  FETCH_ARTICLES_FULFILLED,
  FETCH_AUTHORSHIPS_FULFILLED,
} from "./actionTypes";

const initialState = {
  articles: {},
  authorships: [],
}

export default reducer = (state = { ...initialState }, action) => {
  switch (action.type) {
    case FETCH_ARTICLES_FULFILLED: {
      return {
        ...state,
        articles: action.payload.reduce((acc, article) => {
          acc[ article.id ] = article;
          return acc;
        }, {}),
      };
    }
    case FETCH_AUTHORSHIPS_FULFILLED: {
      return {
        ...state,
        authorships: action.payload,
      };
    }
    default:
      break;
  }
  return state;
};