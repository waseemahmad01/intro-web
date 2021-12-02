import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Provider } from "react-redux";
import store from "./store/index";
import { ThemeProvider } from "@material-ui/core";
import theme from "./components/Theme/theme";
import { BrowserRouter as Router, Route } from "react-router-dom";
import io from "socket.io-client";

const socket = io(process.env.REACT_APP_API_URL, {
  autoConnect: false,
  transports: ["websocket"],
});
socket.connect();
socket.emit("login", "618a23e88d3798e6ecb6ec37");
socket.on("connect_error", (e) => {
  console.log(e);
});
// socket.emit("login", "618a23e88d3798e6ecb6ec37");
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
