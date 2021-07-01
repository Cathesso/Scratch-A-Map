import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { createGlobalStyle } from "styled-components";
import { BrowserRouter as Router } from "react-router-dom";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";

const GlobalStyle = createGlobalStyle`
  body, #root{
    margin: 0;
    height: 100vh;
    width: 100vw;
  }
`;

const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#cfff95",
      main: "#9ccc65",
      dark: "#6b9b37",
      contrastText: "#ffffff",
    },
    secondary: {
      light: "#67daff",
      main: "#03a9f4",
      dark: "#007ac1",
      contrastText: "#ffffff",
    },
  },
  overrides: {
    MuiInputBase: {
      input: {
        color: "rgba(255, 255, 255, 1)",
      },
    },
    MuiInputLabel: {
      root: {
        color: "white",
      },
    },
    MuiOutlinedInput: {
      notchedOutline: {
        borderColor: "white",
      },
    },
  },
});

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyle />
    <ThemeProvider theme={theme}>
      <Router>
        <App />
      </Router>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
