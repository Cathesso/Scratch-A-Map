import styled from "styled-components/macro";
import { useContext, useEffect } from "react";
import AuthContext from "../context/AuthContext";
import axios from "axios";

export default function HomePage({ points, setPoints, setIsLoggedIn }) {
  const { jwtDecoded, token } = useContext(AuthContext);
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  useEffect(() => {
    setIsLoggedIn(true);
    //Beim Laden der Seite (nach dem Login) werden die Punkte abgerufen
    axios.get(`/api/user/me`, config).then((response) => {
      console.log(response.data.points);
      setPoints(response.data.points);
      //return response.data;
    }); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Wrapper>
      <div className="centerpiece">
        <div className="statistics">
          <h2>Hello {jwtDecoded.sub}</h2>
          <div>You have {points} Points</div>
        </div>
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
  .centerpiece {
    grid-column-start: 2;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .statistics {
    color: white;
    background: rgba(128, 128, 128, 0.35);
    box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
    backdrop-filter: blur(9.5px);
    -webkit-backdrop-filter: blur(9.5px);
    border-radius: 10px;
    border: 1px solid rgba(255, 255, 255, 0.18);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 10px;
  }
`;
