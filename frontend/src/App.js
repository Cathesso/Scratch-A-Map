import { Switch, Route } from "react-router-dom";
import ExplorePage from "./pages/ExplorePage";
import styled from "styled-components/macro";
import LoginPage from "./pages/LoginPage";
import Header from "./components/Header";
import AuthProvider from "./context/AuthProvider";
import HomePage from "./pages/HomePage";
import { useState } from "react";
import background from "./img/background.jpg";

function App() {
  const [points, setPoints] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Wrapper>
      <AuthProvider>
        <Header isLoggedIn={isLoggedIn} />
        <Switch>
          <Route path={"/"} exact>
            <LoginPage setIsLoggedIn={setIsLoggedIn} />
          </Route>
          <Route path={"/home"} exact>
            <HomePage
              points={points}
              setPoints={setPoints}
              setIsLoggedIn={setIsLoggedIn}
            />
          </Route>
          <Route path={"/explore"} exact>
            <ExplorePage points={points} setIsLoggedIn={setIsLoggedIn} />
          </Route>
        </Switch>
      </AuthProvider>
    </Wrapper>
  );
}

export default App;

const Wrapper = styled.div`
  margin: 0;
  height: 100%;
  width: 100vw;
  background-color: hotpink;
  background-image: url(${background});
  background-size: cover;
  display: flex;
  flex-direction: column;
`;
