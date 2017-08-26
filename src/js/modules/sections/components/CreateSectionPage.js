import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import { createSection } from "../actions";
import CreateSectionForm from "./CreateSectionForm";

const CreateSectionPage = ({ createSection }) => {
  return (
    <div>
      <h3>Create a Section</h3>
      <CreateSectionForm onSubmit={ createSection }/>
    </div>
  )
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ createSection }, dispatch);
};

export default connect(
  null,
  mapDispatchToProps,
)(CreateSectionPage)