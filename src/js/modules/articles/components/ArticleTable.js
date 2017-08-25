import React from "react";

import ArticleTableForm from "./ArticleTableForm";

const ArticleTable = () => {
  const handleSubmit = values => {
    console.log(values);
  };
  return (
    <div>
      <ArticleTableForm onSubmit={ handleSubmit }/>
    </div>
  );
};

export default ArticleTable;