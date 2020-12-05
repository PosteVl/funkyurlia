import React from "react";

const ShortUrlField = (props) => {
  return (
    <div className="shortUrl">
      <p>
        try me{" "}
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
