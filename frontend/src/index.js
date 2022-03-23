import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import {UserProvider} from "./userContext.js"
import "./index.css"
ReactDOM.render(
  <React.StrictMode> 
    <UserProvider>

   <Suspense fallback="Loading...">
   <Router basename={'/demo'} forceRefresh={true}>

      <App />
      </Router>
      </Suspense>
    </UserProvider>
   
  </React.StrictMode>,
  document.getElementById("root")
);
