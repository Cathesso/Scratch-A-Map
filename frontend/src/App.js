import { Switch, Route } from "react-router-dom";
import ExplorePage from "./pages/ExplorePage";
import styled from "styled-components/macro";
import LoginPage from "./pages/LoginPage";
import Header from "./components/Header";
import AuthProvider from "./context/AuthProvider";
import HomePage from "./pages/HomePage";
import { useState } from "react";
import background from "./img/background.jpg";
import coin from "./img/coin.png";
import Computer from "./components/Computer";

function App() {
  const [points, setPoints] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <Wrapper>
      <AuthProvider>
        <Header isLoggedIn={isLoggedIn} isLoading={isLoading} />
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
            <ExplorePage
              points={points}
              setIsLoading={setIsLoading}
              coin={coin}
            />
          </Route>
        </Switch>
        {isLoading && (
          <Loader>
            <Computer />
          </Loader>
        )}
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

const Loader = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  bottom: 0px;
`;
