import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Field, reduxForm } from "redux-form";

import { fetchArticles } from "../../articles/actions";
import { fetchSections } from "../../sections/actions";

class ArticleTableForm extends Component {
  componentDidMount() {
    this.props.fetchSections();
    this.props.fetchArticles();
  }

  render() {
    const {
      data,
      handleSubmit,
      module,
      sections,
    } = this.props;
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
              Object.keys(
                Object.values(data)[ 0 ]
              ).map((key, index) => <th key={ index }>{ key }</th>)
            }
          </tr>
          </thead>
          <tbody>
          {
            Object.values(data).map(item => {
              return (
                <tr key={ item.id }>
                  <td key={ -1 }>
                    <Field name={ item.id.toString() }
                           component="input"
                           type="checkbox"/>
                  </td>
                  {
                    Object.keys(item).map((key, index) => {
                      // articles show section names instead of sectionId's.
                      if (module === 'articles' && key === 'sectionId') {
                        return <td key={ index }>{ sections[ item.sectionId ].name }</td>;
                      }
                      // sections show parent names instead of parentId's.
                      else if (module === 'sections' && key === 'parentId' && item.parentId) {
                        return <td key={ index }>{ sections[ item.parentId ].name }</td>;
                      }
                      return <td key={ index }>{ item[ key ] }</td>;
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
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ fetchArticles, fetchSections }, dispatch);
};

export default reduxForm({
  form: 'tableForm',
})(connect(mapStateToProps, mapDispatchToProps)(TableForm));