import styled from "styled-components/macro";
import { useContext, useEffect } from "react";
import AuthContext from "../context/AuthContext";
import axios from "axios";

export default function HomePage({ points, setPoints }) {
  const { jwtDecoded } = useContext(AuthContext);
  const { token } = useContext(AuthContext);
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  useEffect(() => {
    //Beim Laden der Seite (nach dem Login) werden die Punkte abgerufen
    axios.get(`/api/user/me`, config).then((response) => {
      console.log(response.data.points);
      setPoints(response.data.points);
      //return response.data;
    }); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Wrapper>
      <div class="statistics">
        <h2>Hello {jwtDecoded.sub}</h2>
        <div>You have {points} Points</div>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  height: 100%;
  text-align: center;
  display: grid;
  margin: 3%;
  grid-template-columns: 1fr auto 1fr;
  .statistics {
    grid-column-start: 2;
    color: white;
    display: flex;
    flex-direction: column;
    justify-items: center;
    align-items: center;
  }
`;
