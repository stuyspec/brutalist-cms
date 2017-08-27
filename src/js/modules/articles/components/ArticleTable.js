import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import { deleteArticle } from "../actions";
import ArticleTableForm from "./ArticleTableForm";

const ArticleTable = ({ deleteArticle }) => {
  const handleSubmit = values => {
    if (values.bulkAction === 'delete') {
      Object.keys(values.articles).map(slug => {
        deleteArticle({ slug: slug });
      });
    }
  };
  return (
    <div>
      <ArticleTableForm onSubmit={ handleSubmit }/>
    </div>
  );
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ deleteArticle }, dispatch);
};

export default connect(null, mapDispatchToProps)(ArticleTable);