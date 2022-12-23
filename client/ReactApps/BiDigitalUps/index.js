import React from "react";
import ReactDOM, { render } from "react-dom";
import "./index.css";
import App from "./App";

window.onload = () => {
  //development
  if (window.reactAppDevelopment)
    render(<App />, document.getElementById("react-app-development"));

  window.renderReactApp = (id) => render(<App />, document.getElementById(id));
};
