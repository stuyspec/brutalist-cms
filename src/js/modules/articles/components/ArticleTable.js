import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchArticles } from "../actions";
import { fetchSections } from "../../sections/actions";

class ArticleTable extends Component {
  componentDidMount() {
    this.props.fetchSections();
    this.props.fetchArticles();
  }

  render() {
    const { articles, sections } = this.props;
    return (
      <table>
        <thead>
        <tr>
          <th> </th>
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
                <td></td>
                <td>{ article.id }</td>
                <td>{ article.title }</td>
                <td>{ sections[ article.sectionId ].name }</td>
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
}

const mapStateToProps = state => ({
  articles: state.articles.articles,
  sections: state.sections.sections,
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ fetchArticles, fetchSections }, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ArticleTable);