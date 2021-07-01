import styled from "styled-components/macro";
import StreetMap from "../components/StreetMap";

export default function ExplorePage({ points }) {
  return (
    <Wrapper>
      <StreetMap points={points} />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  height: 100%;
  text-align: center;
`;
