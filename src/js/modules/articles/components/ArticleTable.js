import React from "react";
import { connect } from "react-redux";

const ArticleTable = ({ articles, sections }) => {
  return (
    <table>
      <thead>
      <tr>
        <th>id</th>
        <th>title</th>
        <th>section</th>
        <th>issue</th>
        <th>volume</th>
      </tr>
      </thead>
      <tbody>
      {
        Object.values(articles).map(article => {
          return (
            <tr key={ article.id }>
              <td>{ article.id }</td>
              <td>{ article.title }</td>
              <td>{ sections[ article.sectionId ] }</td>
              <td>{ article.issue }</td>
              <td>{ article.volume }</td>
            </tr>
          );
        })
      }
      </tbody>
    </table>
  );
}

const mapStateToProps = state => ({
  articles: state.articles.articles,
  sections: state.sections.sections,
});

export default connect(
  mapStateToProps,
)(ArticleTable);