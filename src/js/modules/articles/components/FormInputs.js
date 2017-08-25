import React from "react";
import Select from "react-select";

export const renderInput = ({ input, label, type, meta: { touched, error } }) => {
  return (
    <div>
      <input { ...input } placeholder={ label } type={ type }/>
      {
        touched && error && (
          <span>
            { error }
          </span>
        )
      }
    </div>
  );
};

export const renderTextArea = ({ input, label, meta: { touched, error } }) => {
  return (
    <div>
      <textarea { ...input } placeholder={ label }/>
      {
        touched && error && (
          <span>
            { error }
          </span>
        )
      }
    </div>
  );
};

export const renderDropdown = ({ input, options, name, multi }) => (
  <Select
    { ...input }
    name={ name }
    options={ options }
    value={ input.value }
    onChange={ (value) => input.onChange(value) }
    onBlur={ () => input.onBlur(input.value) }
    multi={ multi }
    clearable={ false }
  />
)