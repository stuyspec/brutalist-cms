import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import { deleteSection } from "../actions";
import SectionTableForm from "./SectionTableForm";

const SectionTable = ({ deleteSection }) => {
  const handleSubmit = values => {
    if (values.bulkAction === 'delete') {
      Object.keys(values.sections).map(slug => {
        deleteSection({ slug: slug });
      });
    }
  };
  return (
    <div>
      <SectionTableForm onSubmit={ handleSubmit }/>
    </div>
  );
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ deleteSection }, dispatch);
};

export default connect(null, mapDispatchToProps)(SectionTable);