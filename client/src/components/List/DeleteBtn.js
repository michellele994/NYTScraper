import React from "react";

export const DeleteBtn = props => (
  <button {...props} className="custom-button col-md-2">
    {props.children}
  </button>
);