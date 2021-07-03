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
`;
