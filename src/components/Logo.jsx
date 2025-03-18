import React from "react";
import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <div className="logo">
      <Link to="/">
        Electron<i className="fa-solid fa-bolt"></i>cs
      </Link>
    </div>
  );
};

export default Logo;
