import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import "bootstrap/dist/css/bootstrap.css";
import "./assets/css/index.css";
import { config } from "./config/firebase";
import firebase from "firebase";

import * as serviceWorker from "./serviceWorker";

firebase.initializeApp(config);

ReactDOM.render(<App />, document.getElementById("root"));

serviceWorker.unregister();
