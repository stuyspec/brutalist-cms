import React from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";

import {
  renderInput,
  renderTextArea,
  renderDropdown
} from "./FormInputs";

const validate = values => {
  const errors = {}
  if (!values.title) {
    errors.title = 'Required';
  }
  if (!values.content) {
    errors.content = 'Required';
  }
  return errors;
};

const CreateArticleForm = ({ handleSubmit, sections, users, pristine, reset, submitting }) => {
  return (
    <form onSubmit={ handleSubmit }>
      <table>
        <tbody>
          <tr>
            <td>Title</td>
            <td>
              <Field name="title" type="text" component={ renderInput } label="Title"/>
            </td>
          </tr>
          <tr>
            <td>Section</td>
            <td>
              <Field name="section" data={ Object.values(sections) } component={ renderDropdown } label="Section"/>
            </td>
          </tr>
          <tr>
            <td>Content</td>
            <td>
              <Field name="content" component={ renderTextArea } label="Content"/>
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
  sections: state.sections.sections,
  users: state.users.users,
})

export default reduxForm({
  form: 'createArticle',
  validate,
})(connect(mapStateToProps)(CreateArticleForm));