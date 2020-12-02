import React from "react";

const ShortUrlField = (props) => {
  return (
    <div>
      <p>
        <a href={props.originalUrlValue}>{props.originalUrlValue}</a> became{" "}
        <a href={props.shortUrlValue}>{props.shortUrlValue}</a>
      </p>
    </div>
  );
};

export default ShortUrlField;
