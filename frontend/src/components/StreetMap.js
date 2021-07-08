import { MapContainer, TileLayer, useMap } from "react-leaflet";
import styled from "styled-components/macro";
import GameController from "./GameController";

export default function StreetMap({ points, setIsLoading, setPoints }) {
  return (
    <Wrapper>
      <PointDisplay>Points collected: {points}</PointDisplay>
      <MapContainer zoom={20} scrollWheelZoom={true}>
        <GameController
          points={points}
          setIsLoading={setIsLoading}
          setPoints={setPoints}
          useMap={useMap}
        />

        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </MapContainer>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  height: 100%;
  .leaflet-container {
    height: 100%;
  }

  .my-transition {
    top: 0;
    opacity: 1;
    position: absolute;
    -webkit-transition: top 0.25s cubic-bezier(0, 0, 0.25, 1),
      opacity 0.25s cubic-bezier(0, 0, 0.25, 1);
    -moz-transition: top 0.25s cubic-bezier(0, 0, 0.25, 1),
      opacity 0.25s cubic-bezier(0, 0, 0.25, 1);
    -o-transition: top 0.25s cubic-bezier(0, 0, 0.25, 1),
      opacity 0.25s cubic-bezier(0, 0, 0.25, 1);
    transition: top 0.25s cubic-bezier(0, 0, 0.25, 1),
      opacity 0.25s cubic-bezier(0, 0, 0.25, 1);
  }
  .my-transition-enter {
    top: -4px;
    opacity: 0.01;
  }
  .my-transition-leave,
  .my-transition-leave-active {
    -webkit-transition: opacity 0.7s cubic-bezier(0, 0, 0.25, 1);
    -moz-transition: opacity 0.7s cubic-bezier(0, 0, 0.25, 1);
    -o-transition: opacity 0.7s cubic-bezier(0, 0, 0.25, 1);
    transition: opacity 0.7s cubic-bezier(0, 0, 0.25, 1);
  }
  .my-transition-leave-active {
    opacity: 0.01;
  }
`;

const PointDisplay = styled.div`
  position: absolute;
  right: 0;
  z-index: 9999;
  color: #03a9f4;
  color: white;
  background: rgba(0, 122, 193, 0.35);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(9.5px);
  -webkit-backdrop-filter: blur(9.5px);
  padding: 10px;
  border-radius: 0 0 0 10px;
  border: 1px solid rgba(255, 255, 255, 0.18);
`;
