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
);

export class FileInput extends React.Component {
  constructor(props) {
    super(props);
  }

  onChange = (e) => {
    const { input: { onChange } } = this.props;
    onChange(e.target.files[0]);
  }

  render() {
    const { input: { value } } = this.props;
    return <input type="file" onChange={(e) => this.onChange(e)}/>;
  }
}