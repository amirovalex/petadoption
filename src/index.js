import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { UserProvider } from "./context/UserContext";
import { PetProvider } from "./context/PetContext";
import { BrowserRouter } from "react-router-dom";
import { CookiesProvider } from "react-cookie";

const theme = createTheme({
  palette: {
    primary: {
      main: "#fff",
    },
    secondary: {
      main: "#14445A",
    },
  },
  components: {
    NativeSelect: {
      svg: {
        display: "none",
      },
    },
  },
});
ReactDOM.render(
  <React.StrictMode>
    <CookiesProvider>
      <ThemeProvider theme={theme}>
        <UserProvider>
          <PetProvider>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </PetProvider>
        </UserProvider>
      </ThemeProvider>
    </CookiesProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
