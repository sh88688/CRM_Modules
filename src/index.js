import React from "react";
import ReactDOM from "react-dom";
import Dashboard from "./Dashboard";
// THEME
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import muiTheme from "./theme/muiTheme";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <MuiThemeProvider theme={muiTheme}>
    <Dashboard />
  </MuiThemeProvider>,
  rootElement
);
