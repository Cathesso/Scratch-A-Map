import {
  MapContainer,
  TileLayer,
  useMapEvents,
} from "react-leaflet";
import styled from "styled-components/macro";
import axios from "axios";
import { useEffect, useState } from "react";

let L = window.L;

let userIcon = L.icon({
  iconUrl: "https://image.flaticon.com/icons/png/128/1223/1223505.png",
  iconSize: [64, 64],
});

let nodeIcon = L.icon({
  iconUrl: "https://image.flaticon.com/icons/png/128/2/2013.png",
  iconSize: [10, 10],
});

export default function StreetMap() {
  let userMarker = new L.marker([27.380583, 33.631839], { icon: userIcon });
  const [markers, setMarkers] = useState([]);
  const [userBounds, setUserBounds] = useState("");
  //const [userIsWithinBounds, setUserIsWithinBounds] = useState(false);

  useEffect(() => {
    if (userBounds !== "") {
      getMarkers();
    }
  }, [userBounds]);

  function getMarkers() {
    axios
      .get(
        `/mapdata/getmarkers?sWLat=` +
          userBounds._southWest.lat +
          `&sWLon=` +
          userBounds._southWest.lng +
          `&nELat=` +
          userBounds._northEast.lat +
          `&nELon=` +
          userBounds._northEast.lng,
        {
          auth: {
            username: "TestUser",
            password: "123456",
          },
        }
      )
      .then((response) => {
        return response.data;
      })
      .then(setMarkers)
      .catch((error) => console.log(error));
  }

  function PlayerController() {
    const map = useMapEvents({
      click: () => {
        //ToDo: Has to be changed to a timer
        map.locate(); //Finds User via Browser's built-in functions
      },
      locationfound: (userLocation) => {
        //if location is found
        map.removeLayer(userMarker); //remove prior userMarker
        userMarker = new L.marker(userLocation.latlng, { icon: userIcon }); //create new userMarker
        map.addLayer(userMarker); //add new userMarker to App
        map.panTo(userLocation.latlng, 17); // center map on userMarker
        setUserBounds(map.getBounds());
        map.zoomIn(20);
      },
    });
    for (let i = 0; i < markers.length; i++) {
      L.marker([markers[i].latitude, markers[i].longitude], {
        icon: nodeIcon,
        key: markers[i].id,
      }).addTo(map);
    }
    return null;
  }

  return (
    <Wrapper>
      <MapContainer
        center={[27.380583, 33.631839]}
        zoom={16}
        scrollWheelZoom={true}
      >
        <PlayerController />

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
