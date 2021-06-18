import styled from "styled-components/macro";
import StreetMap from "../components/StreetMap";
import Header from "../components/Header";

export default function LoginPage() {
  return (
    <Wrapper>
      <p>Don't Panic!</p>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  height: 100%;
  text-align: center;
  display: grid;
  grid-template-rows: 1fr 9fr;
`;
