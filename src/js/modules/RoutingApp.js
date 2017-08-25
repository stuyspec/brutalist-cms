import Provider from "react-redux/lib/components/Provider";
import React from "react";
import { Switch, Route } from "react-router-dom";
import appHistory from "tools/appHistory";
import ConnectedRouter from "react-router-redux/ConnectedRouter";
import store from "../store";

import HomePage from "./core/components/HomePage";

const RoutingApp = ({}) => {
  return (
    <Provider store={ store }>
      <ConnectedRouter history={ appHistory }>
        <Switch>
          <Route exact path='/' component={ HomePage }/>
        </Switch>
      </ConnectedRouter>
    </Provider>
  );
}

export default RoutingApp;