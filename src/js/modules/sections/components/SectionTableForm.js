import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Link } from "react-router-dom";
import { Field, reduxForm } from "redux-form";

import { fetchArticles } from "../actions";
import { fetchSections } from "../../sections/actions";

class ArticleTableForm extends Component {
  componentDidMount() {
    this.props.fetchSections();
    this.props.fetchArticles();
  }

  render() {
    const {
      articles,
      handleSubmit,
      sections,
    } = this.props;
    const columns = [ 'title', 'volume', 'issue', 'isDraft', 'updatedAt', 'section' ];
    return (
      <form onSubmit={ handleSubmit }>
        <Field name="bulkAction" component="select">
          <option/>
        </Field>
        <button type="submit" disabled={ true }>bulk actions not functional</button>
        <table>
          <thead>
          <tr>
            <th> </th>
            {
              columns.map((col, index) => <th key={ index }>{ col }</th>)
            }
          </tr>
          </thead>
          <tbody>
          {
            Object.values(articles).map(article => {
              return (
                <tr key={ article.id }>
                  <td key={ -1 }>
                    <Field name={ article.id.toString() }
                           component="input"
                           type="checkbox"/>
                  </td>
                  {
                    columns.map((col, index) => {
                      let content = article[ col ];
                      if (col === 'title') {
                        // articles are linked to the article page.
                        content = (
                          <Link to={ `/articles/${ article.id }` }>
                            { article.title }
                          </Link>
                        );
                      }
                      else if (col === 'section') {
                        // sections are linked to the section page.
                        const section = sections[ article.sectionId ];
                        content = (
                          <Link to={ `/sections/${ section.id }` }>
                            { section.name }
                          </Link>
                        );
                      }
                      else if (col === 'isDraft') {
                        // if isDraft is true, articles have a green background.
                        return (
                          <td key={ index }
                              style={ {
                                background: content ? 'green' : 'red'
                              } }>
                            { content }
                          </td>
                        );
                      }
                      return <td key={ index }>{ content }</td>;
                    })
                  }
                </tr>
              );
            })
          }
          </tbody>
        </table>
      </form>
    );
  }
}

const mapStateToProps = state => ({
  sections: state.sections.sections,
  articles: state.articles.articles,
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ fetchArticles, fetchSections }, dispatch);
};

export default reduxForm({
  form: 'articleTableForm',
})(connect(mapStateToProps, mapDispatchToProps)(ArticleTableForm));