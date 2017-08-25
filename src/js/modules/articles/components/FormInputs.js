import React from "react";

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

export const renderDropdown = ({ input, label, data, meta: { touched, error } }) => {
  return (
    <div>
      <select { ...input } placeholder={ label }>
        {
          data.map(object => {
            return <option key={ object.id } value={ object.name }>{ object.name }</option>;
          })
        }
      </select>
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