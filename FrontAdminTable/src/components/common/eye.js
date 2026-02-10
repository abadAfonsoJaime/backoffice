import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const Eye = props => {
  return props.isVisible ? (
    <FontAwesomeIcon
      onClick={props.onToggleVisibility}
      icon={faEye}
      style={{ cursor: "pointer", color: "#4f87ce" }}
    />
  ) : (
    <FontAwesomeIcon
      onClick={props.onToggleVisibility}
      icon={faEyeSlash}
      style={{ cursor: "pointer" }}
    />
  );
};
export default Eye;
