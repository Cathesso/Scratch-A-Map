import styled from "styled-components/macro";
import StreetMap from "../components/StreetMap";

export default function ExplorePage({ points, setIsLoading, setPoints }) {
  return (
    <Wrapper>
      <StreetMap
        points={points}
        setIsLoading={setIsLoading}
        setPoints={setPoints}
      />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  height: 100%;
  text-align: center;
`;
