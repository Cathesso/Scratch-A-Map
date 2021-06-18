import { Switch, Route } from "react-router-dom";
import ExplorePage from "./pages/ExplorePage";
import styled from "styled-components/macro";
import LoginPage from "./pages/LoginPage";
import Header from "./components/Header";

function App() {
  return (
    <Wrapper>
      <Header />
      <Switch>
        <Route path={"/"} exact>
          <LoginPage />
        </Route>
        <Route path={"/explore"} exact>
          <ExplorePage />
        </Route>
      </Switch>
    </Wrapper>
  );
}

export default App;

const Wrapper = styled.div`
  margin: 0;
  height: 100%;
  width: 100vw;
  background-color: hotpink;
  display: flex;
  flex-direction: column;
`;
