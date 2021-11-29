import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Provider } from "react-redux";
import store from "./store/index";
import { ThemeProvider } from "@material-ui/core";
import theme from "./components/Theme/theme";
import { BrowserRouter as Router, Route } from "react-router-dom";

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <Provider store={store}>
      <Router>
        <Route path="/" component={App} />
      </Router>
    </Provider>
  </ThemeProvider>,
  document.getElementById("root")
);
