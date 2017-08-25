import React from "react";
import { connect } from "react-redux";

import { TableForm } from "../../core/components";

const ArticleTable = ({ articles }) => {
  const handleSubmit = values => {
    console.log(values);
  };
  return (
    <div>
      <TableForm data={ articles } module="articles" onSubmit={ handleSubmit }/>
    </div>
  );
};

const mapStateToProps = state => ({
  articles: state.articles.articles,
});

export default connect(mapStateToProps)(ArticleTable);