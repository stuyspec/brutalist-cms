import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div>
      the content management system.
      <Link to="/articles">articles</Link>.
    </div>
  );
};

export default HomePage;
