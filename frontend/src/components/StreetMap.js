import { MapContainer, TileLayer, useMapEvents } from "react-leaflet";
import styled from "styled-components/macro";

let L = window.L;
let userIcon = L.icon({
  iconUrl: "https://image.flaticon.com/icons/png/128/1223/1223505.png",
  iconSize: [64, 64],
});

export default function StreetMap() {
  let userMarker = new L.marker([27.380583, 33.631839], { icon: userIcon });

  function MyComponent() {
    const map = useMapEvents({
      click: () => {
        //Has to be changed to a timer
        map.locate(); //Finds User via Browser's built-in functions
      },
      locationfound: (userLocation) => {
        //if location is found
        map.removeLayer(userMarker); //remove prior userMarker
        userMarker = new L.marker(userLocation.latlng, { icon: userIcon }); //create new userMarker
        map.addLayer(userMarker); //add new userMarker to App
        map.flyTo(userLocation.latlng, 18); // center map on userMarker
      },
    });
    return null;
  }

  return (
    <Wrapper>
      <MapContainer
        center={[27.380583, 33.631839]}
        zoom={16}
        scrollWheelZoom={true}
      >
        <MyComponent></MyComponent>
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
