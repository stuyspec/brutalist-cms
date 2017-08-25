import {
  FETCH_ARTICLES_FULFILLED
} from "./actionTypes";

const initialState = {
  articles: {},
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
    default:
      break;
  }
  return state;
}