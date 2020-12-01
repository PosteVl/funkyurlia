import React from "react";

const UrlForm = (props) => {
  return (
    <div>
      <form onSubmit={props.handleSubmit}>
        <label htmlFor="url_input">URL:</label>
        <input
          id="url_input"
          onChange={props.handleChange}
          value={props.valueName}
        />
        <button type="submit">Funkify</button>
      </form>
    </div>
  );
};

export default UrlForm;
