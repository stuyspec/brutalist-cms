import {
  FETCH_USERS_PENDING,
  FETCH_USERS_FULFILLED,
  FETCH_USERS_REJECTED,
  CREATE_USER_PENDING,
  CREATE_USER_FULFILLED,
  CREATE_USER_REJECTED,
} from "./actionTypes";

const initialState = {
  isFetching: false,
  isFetched: false,
  users: {},
  errors: [],
};

export default reducer = (state = { ...initialState }, action) => {
  switch (action.type) {
    case FETCH_USERS_FULFILLED: {
      return {
        ...state,
        users: action.payload.reduce((acc, user) => {
          acc[ user.id ] = user;
          return acc;
        }, {}),
      };
    }
    case CREATE_USER_FULFILLED: {
      return {
        ...state,
        errors: [],
      }
    }
    case CREATE_USER_REJECTED: {
      return {
        ...state,
        errors: action.payload.response.data.errors.fullMessages,
      }
    }
    default:
      break;
  }
  return state;
}