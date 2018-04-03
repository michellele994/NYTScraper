import React from "react";
import "./../../styles/form.css";

export const Input = props => (
  <div className="form-group">
  {props.labelname}
    <input style={{border: "none", borderRadius: "0px", borderTop: "1px solid black"}} className="form-control " {...props} />
  </div>
);
