import styled from "styled-components/macro";
import StreetMap from "../components/StreetMap";

export default function ExplorePage({ points, setIsLoading }) {
  return (
    <Wrapper>
      <StreetMap points={points} setIsLoading={setIsLoading} />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  height: 100%;
  text-align: center;
`;
