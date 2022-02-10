import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Provider } from "react-redux";
import store from "./store/index";
import { ThemeProvider } from "@material-ui/core";
import theme from "./components/Theme/theme";
import { HashRouter as Router, Route } from "react-router-dom";
import { SocketContext, socket } from "./http/socket";
ReactDOM.render(
  <ThemeProvider theme={theme}>
    <SocketContext.Provider value={socket}>
      <Provider store={store}>
        <Router>
          <Route path="/" component={App} />
        </Router>
      </Provider>
    </SocketContext.Provider>
  </ThemeProvider>,
  document.getElementById("root")
);
