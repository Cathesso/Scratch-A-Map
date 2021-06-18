import styled from "styled-components/macro";
import StreetMap from "../components/StreetMap";

export default function ExplorePage() {
  return (
    <Wrapper>
      <StreetMap />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  height: 100%;
  text-align: center;
`;
