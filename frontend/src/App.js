//import {Switch, Route} from "react-router-dom";
import ExplorePage from "./pages/ExplorePage";
import styled from "styled-components/macro";

function App() {
  return (
    <Wrapper>
      <ExplorePage />
    </Wrapper>
  );
}

export default App;

const Wrapper = styled.div`
  margin: 0;
  height: 100vh;
  width: 100vw;
  ExplorePage {
    height: 100vh;
  }
`;
