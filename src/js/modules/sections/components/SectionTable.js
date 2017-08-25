import React from "react";
import { connect } from "react-redux";

import { TableForm } from "../../core/components";

const SectionTable = ({ sections }) => {
  const handleSubmit = values => {
    console.log(values);
  };
  return (
    <div>
      <TableForm data={ sections } module="sections" onSubmit={ handleSubmit }/>
    </div>
  );
};

const mapStateToProps = state => ({
  sections: state.sections.sections,
});

export default connect(mapStateToProps)(SectionTable);