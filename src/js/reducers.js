import combineReducers from "redux/lib/combineReducers";
import { routerReducer } from "react-router-redux";
import { reducer as formReducer } from "redux-form";
import core from "./modules/core";
import sections from "./modules/sections";
import users from "./modules/users";

export default combineReducers(
  {
    [core.constants.NAME]: core.reducer,
    [sections.constants.NAME]: sections.reducer,
    [users.constants.NAME]: users.reducer,
    router: routerReducer,
    form: formReducer,
  });
