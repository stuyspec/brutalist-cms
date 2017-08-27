import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import injectSheet from "react-jss";

import { fetchSections } from "../../sections/actions"
import { fetchUsers } from "../../users/actions";
import { getSectionsSelectOptions } from "../../sections/selectors";
import { getUsersSelectOptions } from "../../users/selectors";

import {
  renderInput,
  renderTextArea,
  renderDropdown,
  FileInput,
} from "../../core/components/FormInputs";

const styles = {
  tableBody: {
    '& tr td:first-child': {
      width: '104px',
    },
  },
};

const validate = values => {
  const errors = {};
  if (!values.title) {
    errors.title = 'Required';
  }
  if (!values.users || values.users.length === 0) {
    errors.users = 'Required';
  }
  if (!values.sections || values.sections.length === 0) {
    errors.sections = 'Required';
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
  if (values.poster && !values.caption) {
    errors.caption = 'Required';
  }
  if (!values.mediaType) {
    errors.mediaType = 'Required';
  }
  if (!values.mediaTitle) {
    errors.mediaTitle = 'Required';
  }
  if (!values.credits) {
    errors.credits = 'Required';
  }
  if (!values.creator) {
    errors.creator = 'Required';
  }
  return errors;
};

class CreateArticleForm extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.refresh();
  }

  refresh = () => {
    this.props.fetchSections();
    this.props.fetchUsers();
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
        <button onClick={ () => this.refresh() }>refresh</button>
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
        <h3>Featured Media:</h3>
        <table>
          <tbody>
          <tr>
            <td>Upload</td>
            <td><Field type="file" name="poster" component={ FileInput }/></td>
          </tr>
          <tr>
            <td>Media Title (also used as alt text)</td>
            <td>
              <Field name="mediaTitle" type="text" component={ renderInput }
                     label="Media Title"/>
            </td>
          </tr>
          <tr>
            <td>Caption</td>
            <td>
              <Field name="caption" type="text" component={ renderInput }
                     label="Caption"/>
            </td>
          </tr>
          <tr>
            <td>URL</td>
            <td>
              <Field name="url" type="text" component={ renderInput }
                     label="URL"/>
            </td>
          </tr>
          <tr>
            <td>Media Type</td>
            <td>
              <Field name="mediaType" component="select">
                <option />
                <option value="photograph">Photo</option>
                <option value="illustration">Art</option>
              </Field>
            </td>
          </tr>
          <tr>
            <td>Users</td>
            <td>
              <Field name="creator" options={ usersSelectOptions }
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
}

const mapStateToProps = state => ({
  sectionsSelectOptions: getSectionsSelectOptions(state),
  usersSelectOptions: getUsersSelectOptions(state),
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ fetchSections, fetchUsers }, dispatch);
};

const SmartCreateArticleFrom = connect(
  mapStateToProps,
  mapDispatchToProps
)(injectSheet(styles)(CreateArticleForm));

export default reduxForm({
  form: 'createArticle',
  validate,
})(SmartCreateArticleFrom);