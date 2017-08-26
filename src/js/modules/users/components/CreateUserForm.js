import React from "react";
import { Field, reduxForm } from "redux-form";
import injectSheet from "react-jss";

import { renderInput } from "../../core/components/FormInputs";

const styles = {
  errorMessage: {
    color: 'red',
  },
};

const validate = values => {
  const errors = {};
  if (!values.firstName) {
    errors.firstName = 'Required';
  }
  if (!values.lastName) {
    errors.lastName = 'Required';
  }
  if (!values.email) {
    errors.email = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }
  if (!values.description) {
    errors.description = 'Required';
  }
  if (!values.password) {
    errors.password = 'Required';
  }
  if (values.password !== values.passwordConfirmation) {
    errors.passwordConfirmation = 'Password and password confirmation do not match.';
  }
  return errors;
};

const CreateUserForm = ({
                          classes,
                          handleSubmit,
                          pristine,
                          reset,
                          submitting,
                        }) => {
  return (
    <form onSubmit={ handleSubmit }>
      <table>
        <tbody className={ classes.tableBody }>
        <tr>
          <td>First Name</td>
          <td>
            <Field name="firstName" type="text" component={ renderInput }
                   label="First Name"/>
          </td>
        </tr>
        <tr>
          <td>Last Name</td>
          <td>
            <Field name="lastName" type="text" component={ renderInput }
                   label="Last Name"/>
          </td>
        </tr>
        <tr>
          <td>Email</td>
          <td>
            <Field name="email" type="email" component={ renderInput }
                   label="Email"/>
          </td>
        </tr>
        <tr>
          <td>Description</td>
          <td>
            <Field name="description" type="description" component={ renderInput }
                   label="Description"/>
          </td>
        </tr>
        <tr>
          <td>Password</td>
          <td>
            <Field name="password" type="password" component={ renderInput }
                   label="Password"/>
          </td>
        </tr>
        <tr>
          <td>Password Confirmation</td>
          <td>
            <Field name="passwordConfirmation" type="password"
                   component={ renderInput }
                   label="Password Confirmation"/>
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
  form: 'createUser',
  validate,
})(injectSheet(styles)(CreateUserForm));