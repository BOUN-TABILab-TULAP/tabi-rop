import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { UserProvider } from "./userContext.js"
import "./index.css"
import { ThemeProvider } from '@mui/styles';
import { createTheme } from '@mui/material/styles';
const theme = createTheme({
  mainBackgroundColor:"#E6E9EB",
  

});
const darkTheme = createTheme({
  palette: {
    mode: 'light',
  },
});

ReactDOM.render(
  <React.StrictMode>
    <UserProvider>
      <ThemeProvider theme={darkTheme}>
        <Suspense fallback="Loading...">
          <Router basename={'/demo'} forceRefresh={true}>

            <App />
          </Router>
        </Suspense>
      </ThemeProvider>
    </UserProvider>

  </React.StrictMode>,
  document.getElementById("root")
);
