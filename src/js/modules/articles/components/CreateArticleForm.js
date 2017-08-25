import React from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";

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
  return errors;
};

const CreateArticleForm = ({
                             handleSubmit,
                             usersSelectOptions,
                             values,
                             pristine,
                             reset,
                             submitting,
                           }) => {
  return (
    <form onSubmit={ handleSubmit }>
      <div>
        {
          values && (
            Object.keys(values).map((valueName, index) => {
              return <p
                key={ index }>{ `${valueName}: ${ values[ valueName ] }` }</p>
            })
          )
        }
      </div>
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
            <Field name="users" options={ usersSelectOptions } component={ renderDropdown } multi/>
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
  usersSelectOptions: getUsersSelectOptions(state),
  values: state.form.createArticle.values,
})

export default reduxForm({
  form: 'createArticle',
  validate,
})(connect(mapStateToProps)(CreateArticleForm));