import createBrowserHistory from "history/createBrowserHistory";

let appHistory = createBrowserHistory();

appHistory.goTo = (url) => {
    appHistory.replace(url);
};

export default appHistory;