import React from "react";

import SectionTableForm from "./SectionTableForm";

const SectionTable = () => {
  const handleSubmit = values => {
    console.log(values);
  };
  return (
    <div>
      <SectionTableForm onSubmit={ handleSubmit }/>
    </div>
  );
};

export default SectionTable;