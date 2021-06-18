import { Switch, Route } from "react-router-dom";
import ExplorePage from "./pages/ExplorePage";
import styled from "styled-components/macro";
import LoginPage from "./pages/LoginPage";
import Header from "./components/Header";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";

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
});

function App() {
  return (
    <Wrapper>
      <ThemeProvider theme={theme}>
        <Header />
        <Switch>
          <Route path={"/"} exact>
            <LoginPage />
          </Route>
          <Route path={"/explore"} exact>
            <ExplorePage />
          </Route>
        </Switch>
      </ThemeProvider>
    </Wrapper>
  );
}

export default App;

const Wrapper = styled.div`
  margin: 0;
  height: 100vh;
  width: 100vw;
  background-color: hotpink;
`;
