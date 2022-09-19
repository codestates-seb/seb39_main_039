import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import GlobalStyle from "./GlobalStyle";
import store from "./redux/store";
import { Provider } from "react-redux";
import ScrollTop from "./constants/scrollTop";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <ScrollTop />
      <GlobalStyle />
      <App />
    </BrowserRouter>
  </Provider>
);
