import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import CreateUserForm from "./CreateUserForm";

import { createUser } from "../actions";

const CreateUserPage = ({ createUser }) => {
  return (
    <div>
      <h3>Create a User</h3>
      <CreateUserForm onSubmit={ createUser }/>
    </div>
  )
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ createUser }, dispatch);
}

export default connect(
  null,
  mapDispatchToProps,
)(CreateUserPage);