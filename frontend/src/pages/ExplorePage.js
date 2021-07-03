import styled from "styled-components/macro";
import StreetMap from "../components/StreetMap";

export default function ExplorePage({ points, setIsLoading, coin }) {
  return (
    <Wrapper>
      <StreetMap points={points} setIsLoading={setIsLoading} coin={coin} />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  height: 100%;
  text-align: center;
`;
