import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import appHistory from "tools/appHistory";
import ConnectedRouter from "react-router-redux/ConnectedRouter";

import { HomePage, PageLayout } from "./core/components";
import { ArticleTable, CreateArticlePage } from "./articles/components";
import { SectionTable, CreateSectionPage } from "./sections/components";
import { UserTable, CreateUserPage } from "./users/components";

import { fetchArticles } from "./articles/actions";
import { fetchSections } from "./sections/actions";

class RoutingApp extends Component {
  componentDidMount() {
    this.props.fetchSections();
    this.props.fetchArticles();
  }

  render() {
    return (
      <ConnectedRouter history={ appHistory }>
        <PageLayout>
          <Switch>
            <Route exact path='/' component={ HomePage }/>
            <Route exact path='/articles' component={ ArticleTable }/>
            <Route exact path='/articles/new' component={ CreateArticlePage }/>
            <Route exact path='/sections' component={ SectionTable }/>
            <Route exact path='/sections/new' component={ CreateSectionPage }/>
            <Route exact path='/users' component={ UserTable }/>
            <Route exact path='/users/new' component={ CreateUserPage }/>
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