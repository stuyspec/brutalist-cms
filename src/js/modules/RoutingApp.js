import React from "react";
import { Switch, Route } from "react-router-dom";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import appHistory from "tools/appHistory";
import ConnectedRouter from "react-router-redux/ConnectedRouter";

import { HomePage from "./core/components/HomePage";
import { CreateArticlePage } from "./articles/components";
import { CreateSectionPage } from "./sections/components";

import { fetchArticles } from "./articles/actions";
import { fetchSections } from "./sections/actions";

class RoutingApp extends React.Component {
  componentDidMount() {
    this.props.fetchSections();
    this.props.fetchArticles();
  }

  render() {
    return (
      <ConnectedRouter history={ appHistory }>
        <PageLayout>
          <Switch>
            <Route exact path='/' render={ props => (
              <div>
                <CreateArticlePage/>
                <CreateSectionPage/>
              </div>
            ) }/>
            <Route exact path='/articles' component={ HomePage }/>
          </Switch>
        </PageLayout>
      </ConnectedRouter>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ fetchArticles, fetchSections }, dispatch);
};

export default connect(
  null,
  mapDispatchToProps
)(RoutingApp);