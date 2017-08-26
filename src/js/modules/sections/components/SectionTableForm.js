import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Link } from "react-router-dom";
import injectSheet from "react-jss";
import { Field, reduxForm } from "redux-form";

import { fetchSections } from "../actions";

const styles = {
  tableBody: {
  }
};

class SectionTableForm extends Component {
  componentDidMount() {
    this.props.fetchSections();
  }

  render() {
    const {
      classes,
      handleSubmit,
      pristine,
      reset,
      sections,
      submitting,
    } = this.props;
    const columns = [ 'name', 'description', 'slug' ];
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
            Object.values(sections).map(section => {
              return (
                <tr key={ section.id }>
                  <td key={ -1 }>
                    <Field name={ `sections.${section.slug}` }
                           component="input"
                           type="checkbox"/>
                  </td>
                  {
                    columns.map((col, index) => {
                      if (col === 'name') {
                        // sections are linked to the section page.
                        return (
                          <td key={ index }>
                            <Link to={ `/sections/${ section.id }` }>
                              { section.name }
                            </Link>
                          </td>
                        );
                      }
                      return <td key={ index }>{ section[ col ] }</td>;
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
  return bindActionCreators({ fetchSections }, dispatch);
};

const SmartSectionTableForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(injectSheet(styles)(SectionTableForm));

export default reduxForm({
  form: 'sectionTable',
})(SmartSectionTableForm);