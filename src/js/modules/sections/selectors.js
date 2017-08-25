import { createSelector } from "reselect";

export const getSections = state => state.sections.sections;

export const getSectionsSelectOptions = createSelector(
  getSections,
  sections => {
    return Object.values(sections).map(section => {
      return {
        value: section.id,
        label: section.name,
      };
    });
  }
);