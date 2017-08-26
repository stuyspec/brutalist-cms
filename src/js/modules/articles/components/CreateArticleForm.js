import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import injectSheet from "react-jss";

import { fetchSections } from "../../sections/actions"
import { getSectionsSelectOptions } from "../../sections/selectors";
import { getUsersSelectOptions } from "../../users/selectors";

import {
  renderInput,
  renderTextArea,
  renderDropdown,
} from "../../core/components/FormInputs";

const styles = {
  tableBody: {
    '& tr td:first-child': {
      width: '104px',
    },
  },
};

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

class CreateArticleForm extends Component {
  componentDidMount() {
    this.props.fetchSections();
  }

  render() {
    const {
      classes,
      handleSubmit,
      pristine,
      reset,
      sectionsSelectOptions,
      submitting,
      usersSelectOptions,
    } = this.props;
    return (
      <form onSubmit={ handleSubmit }>
        <table>
          <tbody className={ classes.tableBody }>
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
              <Field name="section" options={ sectionsSelectOptions }
                     component={ renderDropdown }/>
            </td>
          </tr>
          <tr>
            <td>Content</td>
            <td>
              <Field name="content" component={ renderTextArea }
                     label="Content"/>
            </td>
          </tr>
          <tr>
            <td>Issue</td>
            <td>
              <Field name="issue" type="number" component={ renderInput }
                     label="Issue"/>
            </td>
          </tr>
          <tr>
            <td>Volume</td>
            <td>
              <Field name="volume" type="number" component={ renderInput }
                     label="Volume"/>
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
}

const mapStateToProps = state => ({
  sectionsSelectOptions: getSectionsSelectOptions(state),
  usersSelectOptions: getUsersSelectOptions(state),
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ fetchSections }, dispatch);
};

const SmartCreateArticleFrom = connect(
  mapStateToProps,
  mapDispatchToProps
)(injectSheet(styles)(CreateArticleForm));

export default reduxForm({
  form: 'createArticle',
  validate,
})(SmartCreateArticleFrom);