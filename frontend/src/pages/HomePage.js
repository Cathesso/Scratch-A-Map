import styled from "styled-components/macro";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthContext";
import axios from "axios";
import SaMLoadingSpinnerAndMascot from "../components/SaMLoadingSpinnerAndMascot";

export default function HomePage({ points, setPoints, setIsLoggedIn }) {
  const { jwtDecoded, token } = useContext(AuthContext);
  const [players, setPlayers] = useState([]);
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  useEffect(() => {
    setIsLoggedIn(true);
    axios.get(`/api/user/me`, config).then((response) => {
      setPoints(response.data.points);
    });
    axios.get(`/api/user/stats`, config).then((response) => {
      setPlayers(response.data);
    });
  }, []); //eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Wrapper>
      <div className="centerpiece">
        <div className="statistics">
          <SaMLoadingSpinnerAndMascot />
          <h2>Hello {jwtDecoded.sub}</h2>
          <div>You have {points} Points</div>
        </div>
        {players && (
          <div className="statistics">
            <h2>These are the top Players:</h2>
            {players.map((player) => (
              <span key={player.username}>
                {player.username} - {player.points} points
              </span>
            ))}
          </div>
        )}
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
    margin: 10px;
    span {
      margin: 3px;
      width: 100%;
      text-align: center;
    }
    span:first-of-type:before {
      content: "👑 ";
    }
    span:nth-of-type(2):before {
      content: "🔎 ";
    }
    span:nth-of-type(3):before {
      content: "🤓 ";
    }
  }
`;
