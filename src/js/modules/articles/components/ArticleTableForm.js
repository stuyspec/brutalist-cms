import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Link } from "react-router-dom";
import injectSheet from "react-jss";
import { Field, reduxForm } from "redux-form";

import { fetchArticles } from "../actions";
import { fetchSections } from "../../sections/actions";

const styles = {
  articleRow: {
    '& td:nth-child(1), td:nth-child(2)': {
      width: '20px',
    },
    '& td:nth-child(4), td:nth-child(5), td:nth-child(6)': {
      // selects all td after the third and before the fifth, inclusively.
      width: '48px',
    },
    '& td:nth-child(7)': {
      width: '194px',
    }
  }
};

class ArticleTableForm extends Component {
  componentDidMount() {
    this.props.fetchSections();
    this.props.fetchArticles();
  }

  render() {
    const {
      articles,
      classes,
      handleSubmit,
      pristine,
      reset,
      sections,
      submitting,
    } = this.props;
    const columns = [ 'id', 'title', 'volume', 'issue', 'isDraft', 'updatedAt', 'section' ];
    return (
      <form onSubmit={ handleSubmit }>
        <Field name="bulkAction" component="select">
          <option/>
          <option value="delete">delete</option>
        </Field>
        <button type="submit" disabled={ pristine || submitting }>Submit</button>
        <button type="button" disabled={ pristine || submitting } onClick={ reset }>
          Clear Values
        </button>
        <table>
          <thead>
          <tr>
            <th> </th>
            {
              columns.map((col, index) => <th key={ index }>{ col }</th>)
            }
          </tr>
          </thead>
          <tbody className={ classes.tableBody }>
          {
            Object.values(articles).map(article => {
              return (
                <tr key={ article.id } className={ classes.articleRow }>
                  <td key={ -1 }>
                    <Field name={ `articles.${article.slug}` }
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

const SmartArticleTableForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(injectSheet(styles)(ArticleTableForm));

export default reduxForm({
  form: 'articleTable',
})(SmartArticleTableForm);