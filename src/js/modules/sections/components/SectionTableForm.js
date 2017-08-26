import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Link } from "react-router-dom";
import injectSheet from "react-jss";
import { Field, reduxForm } from "redux-form";

import { fetchSections } from "../actions";

const styles = {
  sectionRow: {
    '& td:nth-child(1), td:nth-child(2)': {
      width: '20px',
    },
    '& td:nth-child(3), td:nth-child(4)': {
      width: '194px',
    }
  }
};

class SectionTableForm extends Component {
  componentDidMount() {
    this.refresh();
  }

  refresh = () => {
    this.props.fetchSection();
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
    const columns = [ 'id', 'name', 'slug', 'description' ];
    return (
      <div>
        <button onClick={ () => refresh }>refresh</button>
        <form onSubmit={ handleSubmit }>
          <Field name="bulkAction" component="select">
            <option/>
            <option value="delete">delete</option>
          </Field>
          <button type="submit" disabled={ pristine || submitting }>Submit
          </button>
          <button type="button" disabled={ pristine || submitting }
                  onClick={ reset }>
            Clear Values
          </button>
          <table>
            <thead>
            <tr>
              <th></th>
              {
                columns.map((col, index) => <th key={ index }>{ col }</th>)
              }
            </tr>
            </thead>
            <tbody className={ classes.tableBody }>
            {
              Object.values(sections).map(section => {
                return (
                  <tr key={ section.id } className={ classes.sectionRow }>
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
      </div>
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