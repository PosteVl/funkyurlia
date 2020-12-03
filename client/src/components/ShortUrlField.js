import React from "react";
//import urlService from "./services/urlService";

// const handleRedirect = (event) => {
//   event.preventDefault();
//   console.log("REDIRECTED");
//   return ;
// };

const ShortUrlField = (props) => {
  return (
    <div>
      <p>
        <a href={props.originalUrlValue}>{props.originalUrlValue}</a> became{" "}
        <a
          href={props.shortUrlValue}
          onClick={(event) => props.clickHandler(event, props.shortUrlValue)}
        >
          {props.shortUrlValue}
        </a>
      </p>
    </div>
  );
};

export default ShortUrlField;
