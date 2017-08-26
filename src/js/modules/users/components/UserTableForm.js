import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Link } from "react-router-dom";
import injectSheet from "react-jss";
import { Field, reduxForm } from "redux-form";

import { fetchUsers } from "../actions";

const styles = {
  userRow: {
    '& td:nth-child(1)': {
      width: '20px',
    },
    '& td:nth-child(2) td:nth-child(3), td:nth-child(4), td:nth-child(5)': {
      // selects all td after the third and before the fifth, inclusively.
      width: '224px',
    },
  }
};

class UserTableForm extends Component {
  componentDidMount() {
    this.props.fetchUsers();
  }

  render() {
    const {
      users,
      classes,
      handleSubmit,
      pristine,
      reset,
      submitting,
    } = this.props;
    const columns = [ 'id', 'firstName', 'lastName', 'email', 'description' ];
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
            Object.values(users).map(user => {
              return (
                <tr key={ user.id } className={ classes.userRow }>
                  <td key={ -1 }>
                    <Field name={ `users.user-${user.id}` }
                           component="input"
                           type="checkbox"/>
                  </td>
                  {
                    columns.map((col, index) => {
                      let content = user[ col ];
                      if (col === 'email') {
                        // users are linked to the user page.
                        content = (
                          <Link to={ `/users/${ user.id }` }>
                            { user.email }
                          </Link>
                        );
                      }
                      return <td key={ index }>{ content }</td>;
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
  users: state.users.users,
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ fetchUsers }, dispatch);
};

const SmartUserTableForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(injectSheet(styles)(UserTableForm));

export default reduxForm({
  form: 'userTable',
})(SmartUserTableForm);