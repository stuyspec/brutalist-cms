import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";

import { fetchSections } from "../actions";
import { getSectionsSelectOptions } from "../selectors";

import {
  renderInput,
  renderDropdown
} from "../../core/components/FormInputs";

const validate = values => {
  const errors = {}
  if (!values.name) {
    errors.name = 'Required';
  }
  if (!values.description) {
    errors.description = 'Required';
  }
};

class CreateSectionForm extends Component {
  componentDidMount() {
    this.props.fetchSections();
  }

  render() {
    const {
      handleSubmit,
      sectionsSelectOptions,
      pristine,
      reset,
      submitting
    } = this.props;
    return (
      <form onSubmit={ handleSubmit }>
        <table>
          <tbody>
          <tr>
            <td>Name</td>
            <td>
              <Field name="name" type="text" component={ renderInput }
                     label="Name"/>
            </td>
          </tr>
          <tr>
            <td>Description</td>
            <td>
              <Field name="description" type="text" component={ renderInput }
                     label="Description"/>
            </td>
          </tr>
          <tr>
            <td>Parent Section (if applicable)</td>
            <td>
              <Field name="parentId" options={ sectionsSelectOptions }
                     component={ renderDropdown }/>
            </td>
          </tr>
          </tbody>
        </table>
        <div>
          <button type="submit" disabled={ submitting }>
            Submit
          </button>
          <button type="button" disabled={ pristine || submitting }
                  onClick={ reset }>
            Clear Values
          </button>
        </div>
      </form>
    );
  }
};

const mapStateToProps = state => ({
  sectionsSelectOptions: getSectionsSelectOptions(state),
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ fetchSections }, dispatch);
};

export default reduxForm({
  form: 'createSection',
  validate,
})(connect(mapStateToProps, mapDispatchToProps)(CreateSectionForm));