import React from "react";
import "./../../styles/jumbotron.css";

const Jumbotron = ({ children }) => (
  <div style={{ height: 300, clear: "both" }} className="jumbotron">
    {children}
  </div>
);

export default Jumbotron;
