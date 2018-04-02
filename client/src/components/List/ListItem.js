import React from "react";

export const ListItem = props => (
  <li className="list-group-item">
  <div className="row">
    <span className="col-md-10">
      <a href ={props.weburl}>{props.title}</a>
    </span>
    {props.children}
  </div>
  </li>
);
