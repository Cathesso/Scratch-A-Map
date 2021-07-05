import { MapContainer, TileLayer, useMap } from "react-leaflet";
import styled from "styled-components/macro";
import GameController from "./GameController";

export default function StreetMap({ points, setIsLoading }) {
  return (
    <Wrapper>
      <MapContainer
        center={[27.380583, 33.631839]}
        zoom={16}
        scrollWheelZoom={true}
      >
        <GameController
          points={points}
          setIsLoading={setIsLoading}
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
