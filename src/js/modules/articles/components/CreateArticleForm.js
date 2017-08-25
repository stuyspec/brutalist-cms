import React from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";

import { getSectionsSelectOptions } from "../../sections/selectors";
import { getUsersSelectOptions } from "../../users/selectors";

import {
  renderInput,
  renderTextArea,
  renderDropdown,
} from "./FormInputs";

const validate = values => {
  const errors = {}
  if (!values.title) {
    errors.title = 'Required';
  }
  if (!values.content) {
    errors.content = 'Required';
  }
  if (!values.issue) {
    errors.issue = 'Required';
  }
  if (!values.volume) {
    errors.volume = 'Required';
  }
  return errors;
};

const CreateArticleForm = ({
                             handleSubmit,
                             usersSelectOptions,
                             sectionsSelectOptions,
                             pristine,
                             reset,
                             submitting,
                           }) => {
  return (
    <form onSubmit={ handleSubmit }>
      <table>
        <tbody>
        <tr>
          <td>Title</td>
          <td>
            <Field name="title" type="text" component={ renderInput }
                   label="Title"/>
          </td>
        </tr>
        <tr>
          <td>Users</td>
          <td>
            <Field name="users" options={ usersSelectOptions }
                   component={ renderDropdown } multi/>
          </td>
        </tr>
        <tr>
          <td>Section</td>
          <td>
            <Field name="sections" options={ sectionsSelectOptions }
                   component={ renderDropdown }/>
          </td>
        </tr>
        <tr>
          <td>Content</td>
          <td>
            <Field name="content" component={ renderTextArea } label="Content"/>
          </td>
        </tr>
        <tr>
          <td>Issue</td>
          <td>
            <Field name="issue" type="number" component={ renderTextArea } label="Issue"/>
          </td>
        </tr>
        <tr>
          <td>Volume</td>
          <td>
            <Field name="volume" type="number" component={ renderTextArea } label="Volume"/>
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
};

const mapStateToProps = state => ({
  sectionsSelectOptions: getSectionsSelectOptions(state),
  usersSelectOptions: getUsersSelectOptions(state),
  values: state.form.createArticle.values,
})

export default reduxForm({
  form: 'createArticle',
  validate,
})(connect(mapStateToProps)(CreateArticleForm));