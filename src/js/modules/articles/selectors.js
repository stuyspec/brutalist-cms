/**
 * Created by nicholas on 7/25/17.
 */
import { createSelector } from 'reselect'
import { usersSelector } from '../users/selectors'

export const articlesSelector = state => state.articles.list

export const articlesPreviewSelector = createSelector(
  articlesSelector,
  articles => (
    articles.map(
      article => {
        const content = article.content
        // TODO: Make this more scientific on picking preview
        let contentPreview;
        if (content) {
          const lastWordIndex = content.indexOf('</p>') + 4
          contentPreview = content.substring(0, lastWordIndex)
        }
        else {
          contentPreview = "Blank"
        }
        return {
          ...article,
          content: contentPreview,
        }
      }
    )
  )
)

// For fun
export const randomArticleSelector = createSelector(
  articlesSelector,
  articles => (
    articles[Math.floor(Math.random() * articles.length)]
  )
)

let createArticle = {};
createArticle.contributorsSelector = state =>
  state.articles.forms.create.contributors;

createArticle.contributorsUsersSelector = createSelector(
  usersSelector,
  createArticle.contributorsSelector,
  (users, contributors) =>
    users.filter(user => contributors.includes(user.id))
);


createArticle.availableUsersSelector = createSelector(
  usersSelector,
  createArticle.contributorsSelector,
  (users, contributors) => {
    return users.filter(user => !contributors.includes(user.id))
  }
);

createArticle.availableUsernamesSelector = createSelector(
  createArticle.availableUsersSelector,
  availableUsers => (
    availableUsers.map(user => user.username)
  )
);

export { createArticle };


let editArticleSelectors = {};
editArticleSelectors.contributorsSelector = state =>
  state.articles.forms.edit.contributors;

editArticleSelectors.contributorsUsersSelector = createSelector(
  usersSelector,
  editArticleSelectors.contributorsSelector,
  (users, contributors) =>
    users.filter(user => contributors.includes(user.id))
);


editArticleSelectors.availableUsersSelector = createSelector(
  usersSelector,
  editArticleSelectors.contributorsSelector,
  (users, contributors) => {
    return users.filter(user => !contributors.includes(user.id))
  }
);

editArticleSelectors.availableUsernamesSelector = createSelector(
  editArticleSelectors.availableUsersSelector,
  availableUsers => (
    availableUsers.map(user => user.username)
  )
);

export { editArticleSelectors };