import Provider from "react-redux/lib/components/Provider";
import React from "react";
import { Switch, Route } from "react-router-dom";
import appHistory from "tools/appHistory";
import ConnectedRouter from "react-router-redux/ConnectedRouter";
import store from "../store";

import HomePage from "./core/components/HomePage";
import { CreateArticlePage } from "./articles/components";

const RoutingApp = ({}) => {
  return (
    <Provider store={ store }>
      <ConnectedRouter history={ appHistory }>
        <Switch>
          <Route exact path='/' component={ HomePage }/>
          <Route exact path='/articles' component={ CreateArticlePage }/>
        </Switch>
      </ConnectedRouter>
    </Provider>
  );
}

export default RoutingApp;