import React from "react";
import ReactDOM from "react-dom";
import "./styles/css/index.css";
// import "./styles/app.css";
import App from "./components/app";
// import WrappedComponent from "./components/app";
import * as serviceWorker from "./util/serviceWorker";

// ReactDOM.render(<App />, document.getElementById("root"));
ReactDOM.render(<App />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
