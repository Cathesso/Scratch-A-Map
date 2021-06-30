import { MapContainer, TileLayer, useMap } from "react-leaflet";
import styled from "styled-components/macro";
import axios from "axios";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";

let L = window.L;

let userIcon = L.icon({
  iconUrl: "https://image.flaticon.com/icons/png/128/1223/1223505.png",
  iconSize: [64, 64],
});

let nodeIcon = L.icon({
  iconUrl: "https://image.flaticon.com/icons/png/128/2/2013.png",
  iconSize: [10, 10],
});

export default function StreetMap({ points }) {
  const { token } = useContext(AuthContext);
  const { jwtDecoded } = useContext(AuthContext);
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  let userMarker = new L.marker([27.380583, 33.631839], { icon: userIcon });
  let nodes = []; //OSM-Nodes
  let markers = []; //OSM-Nodes converted to Markers
  let userBounds = ""; //Area in which the user moves without new nodes being loaded
  let mapBounds = ""; //Area for which the nodes are loaded
  let userInsideBounds = false;
  let playerPoints = points;

  function getMarkers(map) {
    axios //Request Markers from Backend <-- OSM
      .get(
        `/api/mapData/getNodes?sWLat=` +
          mapBounds._southWest.lat +
          `&sWLon=` +
          mapBounds._southWest.lng +
          `&nELat=` +
          mapBounds._northEast.lat +
          `&nELon=` +
          mapBounds._northEast.lng,
        config
      )
      .then((response) => {
        return response.data;
      })
      .then((data) => {
        nodes = data;
        for (let i = 0; i < markers.length; i++) {
          if (markers[i]) {
            map.removeLayer(markers[i]);
          }
        }

        for (let i = 0; i < nodes.length; i++) {
          //Map Nodes to Markers
          markers[i] = L.marker([nodes[i].latitude, nodes[i].longitude], {
            icon: nodeIcon,
            key: nodes[i].id,
          });
          map.addLayer(markers[i]);
        }
      })
      .catch((error) => console.log(error));
  }

  function saveCollectedNodes(collectedNodes) {
    axios
      .post(`/api/mapData/saveNodes`, { collectedNodes }, config)
      .then((response) => {
        return response.data;
      })
      .catch((error) => console.log(error));
  }

  function checkIfUserIsWithinBounds(userLocation, map) {
    if (
      userBounds === "" ||
      userLocation.latlng.lat > userBounds._northEast.lat ||
      userLocation.latlng.lat < userBounds._southWest.lat ||
      userLocation.latlng.lng > userBounds._northEast.lng ||
      userLocation.latlng.lng < userBounds._southWest.lng
    ) {
      userInsideBounds = false;
    }
    if (userInsideBounds === false) {
      map.setZoom(16);
      mapBounds = map.getBounds();
      map.setZoom(18);
      userBounds = map.getBounds();
      map.setZoom(20);
      getMarkers(map);
      userInsideBounds = true;
    }
  }

  function checkIfUserIsNearMarkers(userLocation, map) {
    let uncollectedMarkers = [];
    let collectedNodes = [];
    let uncollectedNodes = [];
    //let collectedPoints = points;
    for (let i = 0; i < markers.length; i++) {
      //stream machen eventuell markers.filter
      if (markers[i]) {
        if (map.distance(userLocation.latlng, markers[i].getLatLng()) <= 20) {
          map.removeLayer(markers[i]); //If Marker is closer than 20m, then remove marker
          //Add Points for Marker
          playerPoints += 1;
          //Save Node in Backend
          collectedNodes.push(nodes[i]);
        } else {
          uncollectedMarkers.push(markers[i]);
          uncollectedNodes.push(nodes[i]);
        }
      }
    }
    markers = uncollectedMarkers;
    nodes = uncollectedNodes;
    if (collectedNodes.length > 0) {
      saveCollectedNodes(collectedNodes);
      savePoints();
    }
  }

  function savePoints() {
    console.log(points);
    axios
      .post(
        `/api/user/savePoints`,
        { username: jwtDecoded.sub, points: playerPoints },
        config
      )
      .then((response) => {
        return response.data;
      })
      .catch((error) => console.log(error));
  }

  function GameController() {
    const map = useMap();
    function onLocationFound(userLocation) {
      map.removeLayer(userMarker); //remove prior userMarker
      userMarker = new L.marker(userLocation.latlng, { icon: userIcon }); //create new userMarker
      map.addLayer(userMarker); //add new userMarker to App
      map.panTo(userLocation.latlng, 20); //Go to User
      checkIfUserIsWithinBounds(userLocation, map);
      checkIfUserIsNearMarkers(userLocation, map);
    }

    function onLocationError(error) {
      alert(error.message);
    }

    map.on("locationfound", onLocationFound);
    map.on("locationerror", onLocationError);

    setInterval(() => {
      map.locate();
      console.log("Map Locate used"); //Why is this being called twice? I have no idea.
    }, 10000);

    return null;
  }

  return (
    <Wrapper>
      <MapContainer
        center={[27.380583, 33.631839]}
        zoom={16}
        scrollWheelZoom={true}
      >
        <GameController />

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
