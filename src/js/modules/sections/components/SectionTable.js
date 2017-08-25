import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { fetchSections } from "../../sections/actions";

class SectionTable extends Component {
  componentDidMount() {
    this.props.fetchSections();
  }

  render() {
    const { sections } = this.props;
    return (
      <table>
        <thead>
        <tr>
          <th>id</th>
          <th>name</th>
          <th>description</th>
          <th>parent</th>
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
                <td>{ section.parentId && sections[ section.parentId ].name }</td>
              </tr>
            );
          })
        }
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = state => ({
  sections: state.sections.sections,
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ fetchSections }, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SectionTable);