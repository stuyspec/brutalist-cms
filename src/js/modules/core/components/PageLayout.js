import React from "react";
import { Link } from "react-router-dom";

const PageLayout = ({ children }) => {
  return (
      <div>
        <ul>
          <li><Link to="/">home</Link></li>
          <li><Link to="/articles">articles table</Link></li>
          <li><Link to="/articles/new">new article</Link></li>
          <li><Link to="/sections">sections table</Link></li>
          <li><Link to="/sections/new">new section</Link></li>
          <li><Link to="/users">users table</Link></li>
          <li><Link to="/users/new">new user</Link></li>
        </ul>
        { children }
      </div>
  );
};

export default PageLayout;