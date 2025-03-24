import React from "react";

const Footer = () => {
  return (
    <footer className="footer" id="footer">
      <code>
        Created by Elad Reuveny | <i className="fa-regular fa-copyright"></i>{" "}
        {new Date().getFullYear()} All Rights Reserved
      </code>
    </footer>
  );
};

export default Footer;
