import React from "react";

const ShortUrlField = (props) => {
  console.log("in shorturl component");
  console.log("shitty value is " + props.redirectedUrlValue)
  return (
    <div>
      <p>
        <a href={props.originalUrlValue}>{props.originalUrlValue}</a> became{" "}
        <a href={props.redirectedUrlValue}>{props.shortUrlValue}</a>
      </p>
    </div>
  );
};

export default ShortUrlField;
