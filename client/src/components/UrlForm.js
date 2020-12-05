import React from "react";
import Button from "react-bootstrap/Button";
import SearchIcon from '@material-ui/icons/Search';

const UrlForm = (props) => {
  return (
    <div id="urlFormDiv">
      <form id="urlForm" onSubmit={props.handleSubmit}>
        <input
          id="url_input"
          onChange={props.handleChange}
          value={props.valueName}
          placeholder="https://example.com"
        />
        <Button id="funk-button" variant="outline-dark" type="submit">
          <SearchIcon />
        </Button>
      </form>
    </div>
  );
};

export default UrlForm;
