import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import { deleteUser } from "../actions";
import UserTableForm from "./UserTableForm";

const UserTable = ({ deleteUser }) => {
  const handleSubmit = values => {
    if (values.bulkAction === 'delete') {
      Object.keys(values.users).map(slug => {
        deleteUser({ slug: slug });
      });
    }
  };
  return (
    <div>
      <UserTableForm onSubmit={ handleSubmit }/>
    </div>
  );
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ deleteUser }, dispatch);
};

export default connect(null, mapDispatchToProps)(UserTable);