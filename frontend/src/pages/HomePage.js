import styled from "styled-components/macro";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthContext";
import axios from "axios";

export default function HomePage() {
  const { token } = useContext(AuthContext);
  const { jwtDecoded } = useContext(AuthContext);
  const [points, setPoints] = useState("");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  useEffect(() => {
    axios.get(`/api/user/me`, config).then((response) => {
      setPoints(response.data.points);
      return response.data;
    });
  }, []);

  return (
    <Wrapper>
      <div>Hello {jwtDecoded.sub}</div>
      <div>You have {points} Points</div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  height: 100%;
  text-align: center;
  display: grid;
  grid-template-rows: 1fr 9fr;
  margin: 1%;
`;
