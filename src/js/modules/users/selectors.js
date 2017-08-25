import { createSelector } from "reselect";

export const getUsers = state => state.users.users;

export const getUsersSelectOptions = createSelector(
  getUsers,
  users => {
    return Object.values(users).map(user => {
      return {
        value: user.id,
        label: `${user.firstName} ${user.lastName}: ${user.email}`,
      };
    });
  }
);