import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import { createSection } from "../actions";
import CreateSectionForm from "./CreateSectionForm";

const CreateSectionPage = ({ createSection }) => {
  const handleSubmit = values => {
    createSection( values );
  };

  return (
    <div>
      <h3>Create a Section</h3>
      <CreateSectionForm onSubmit={ handleSubmit }/>
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