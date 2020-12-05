import React from "react";

const Footer = ({footerValue}) => {
  return (
    <div className="footer">
      <footer>
        <p>By {footerValue}</p>
      </footer>
    </div>
  );
};

export default Footer;
