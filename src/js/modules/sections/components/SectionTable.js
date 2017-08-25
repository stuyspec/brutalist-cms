import React from "react";
import { connect } from "react-redux";

const SectionTable = ({ sections }) => {
  return (
    <table>
      <thead>
      <tr>
        <th>id</th>
        <th>name</th>
        <th>description</th>
      </tr>
      </thead>
      <tbody>
      {
        Object.values(sections).map(section => {
          return (
            <tr key={ section.id }>
              <td>{ section.id }</td>
              <td>{ section.name }</td>
              <td>{ section.description }</td>
            </tr>
          );
        })
      }
      </tbody>
    </table>
  );
}

const mapStateToProps = state => ({
  sections: state.sections.sections,
});

export default connect(
  mapStateToProps,
)(SectionTable);