import React from "react";
import { Field, reduxForm } from "redux-form";

import { renderInput } from "./FormInputs";

const validate = values => {
  const errors = {}
  if (!values.name) {
    errors.name = 'Required';
  }
  if (!values.description) {
    errors.description = 'Required';
  }
};

const CreateSectionForm = ({
                             handleSubmit,
                             pristine,
                             reset,
                             submitting,
                           }) => {
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

export default reduxForm({
  form: 'createSection',
  validate,
})(CreateSectionForm);