import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import { createArticle } from "../actions";
import CreateArticleForm from "./CreateArticleForm";

const CreateArticlePage = ({}) => {
  const handleSubmit = values => {
    createArticle( values );
  };

  return (
    <div>
      <h3>Create an Article</h3>
      <CreateArticleForm handleSubmit={ handleSubmit }/>
    </div>
  )
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ createArticle }, dispatch);
};

export default connect(
  null,
  mapDispatchToProps,
)(CreateArticlePage)