import { FETCH_USERS_FULFILLED } from "./actionTypes";

const initialState = {
  users: {},
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
    default:
      break;
  }
  return state;
}