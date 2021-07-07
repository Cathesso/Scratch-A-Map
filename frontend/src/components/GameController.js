import axios from "axios";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthContext";
import coin from "../img/coin.png";
import explorer from "../img/explorer.png";
import treasureChest from "../img/treasure-chest.png";
import L from "leaflet";
import styled from "styled-components/macro";

let userIcon = L.icon({
  iconUrl: explorer,
  iconRetinaUrl: explorer,
  iconSize: [64, 64],
});

const nodeIcon = L.icon({
  iconUrl: coin,
  iconRetinaUrl: coin,
  iconSize: [32, 32],
});

const samNodeIcon = L.icon({
  iconUrl: treasureChest,
  iconRetinaUrl: treasureChest,
  iconSize: [32, 32],
});

let userMarker = L.marker([27.380583, 33.631839], { icon: userIcon });

export default function GameController({
  points,
  setIsLoading,
  setPoints,
  useMap,
}) {
  const { token } = useContext(AuthContext);
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  let playerPoints = points;
  const map = useMap();
  const [nodes, setNodes] = useState(null);
  const [markers, setMarkers] = useState(null);
  const [markersLoaded, setMarkersLoaded] = useState(false);
  const [playerBounds, setPlayerBounds] = useState(false);
  const [playerBoundsVisualization, setPlayerBoundsVisualization] =
    useState(null);
  const [mapBounds, setMapBounds] = useState(null);
  const [mapBoundsVisualization, setMapBoundsVisualization] = useState(null);
  const [allBoundsLoaded, setAllBoundsLoaded] = useState(null);
  const [playerLocation, setPlayerLocation] = useState(null);
  const [nodesLoaded, setNodesLoaded] = useState(false);
  const { jwtDecoded } = useContext(AuthContext);

  useEffect(() => {
    setIsLoading(true);
    map.locate();
    map.on("locationfound", onLocationFound);
    map.on("locationerror", onLocationError);
    const timer = setInterval(() => {
      map.locate();
      map.on("locationfound", onLocationFound);
      map.on("locationerror", onLocationError);
    }, 10000);
    return () => {
      clearInterval(timer);
      setNodes(null);
      setMarkers(null);
      setMarkersLoaded(false);
      setPlayerBounds(false);
      setMapBounds(null);
      setAllBoundsLoaded(null);
      setPlayerLocation(null);
      setNodesLoaded(false);
    };
  }, []); //eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (playerLocation) {
      map.removeLayer(userMarker);
      userMarker = L.marker(playerLocation.latlng, { icon: userIcon });
      map.addLayer(userMarker);
      map.panTo(playerLocation.latlng, 20);
      if (!mapBounds) {
        loadAllBounds();
      } else if (!checkIfPlayerIsWithinBounds()) {
        loadAllBounds();
      } else {
        checkIfPlayerIsNearMarkers();
      }
    }
  }, [playerLocation]); //eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (mapBounds && allBoundsLoaded) {
      if (playerBoundsVisualization) {
        map.removeLayer(playerBoundsVisualization);
      }
      if (mapBoundsVisualization) {
        map.removeLayer(mapBoundsVisualization);
      }
      setPlayerBoundsVisualization(visualizeBounds(playerBounds, "green"));
      setMapBoundsVisualization(visualizeBounds(mapBounds, "red"));
      loadNodesFromBackend();
      setAllBoundsLoaded(false);
    }
  }, [allBoundsLoaded]); //eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (nodesLoaded) {
      if (markers) {
        removeAllMarkersFromMap();
        createNewMarkers();
      } else {
        createNewMarkers();
      }
    }
  }, [nodesLoaded]); //eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (markers && markersLoaded) {
      markers.map((marker) => map.addLayer(marker));
      setMarkersLoaded(false);
    }
  }, [markersLoaded]); //eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (playerBoundsVisualization) {
      map.addLayer(playerBoundsVisualization);
    }
  }, [playerBoundsVisualization]); //eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (mapBoundsVisualization) {
      map.addLayer(mapBoundsVisualization);
    }
  }, [mapBoundsVisualization]); //eslint-disable-line react-hooks/exhaustive-deps

  function onLocationFound(userLocation) {
    setPlayerLocation(userLocation);
  }

  function onLocationError(error) {
    alert(error.message);
  }

  function loadAllBounds() {
    if (playerLocation) {
      map.setZoom(20);
      setMapBounds(getBoundsForWiderArea(7));
      setPlayerBounds(getBoundsForWiderArea(6));
      setAllBoundsLoaded(true);
    }
  }

  function visualizeBounds(boundToVisualize, chosenColor) {
    return L.rectangle(
      [
        [boundToVisualize._northEast.lat, boundToVisualize._northEast.lng],
        [boundToVisualize._southWest.lat, boundToVisualize._southWest.lng],
      ],
      { color: chosenColor, fill: false }
    );
  }

  function getBoundsForWiderArea(area) {
    map.setView(playerLocation.latlng, 20);
    map.setZoom(20);
    let boundsOfView = map.getBounds();
    let neLat =
      (boundsOfView._northEast.lat - playerLocation.latlng.lat) * area +
      playerLocation.latlng.lat;
    let neLon =
      (boundsOfView._northEast.lng - playerLocation.latlng.lng) * area +
      playerLocation.latlng.lng;
    let swLat =
      (boundsOfView._southWest.lat - playerLocation.latlng.lat) * area +
      playerLocation.latlng.lat;
    let swLon =
      (boundsOfView._southWest.lng - playerLocation.latlng.lng) * area +
      playerLocation.latlng.lng;
    return {
      _southWest: {
        lat: swLat,
        lng: swLon,
      },
      _northEast: {
        lat: neLat,
        lng: neLon,
      },
    };
  }

  function checkIfPlayerIsWithinBounds() {
    if (
      playerLocation.latlng.lat > playerBounds._northEast.lat ||
      playerLocation.latlng.lat < playerBounds._southWest.lat ||
      playerLocation.latlng.lng > playerBounds._northEast.lng ||
      playerLocation.latlng.lng < playerBounds._southWest.lng
    ) {
      return false;
    } else {
      return true;
    }
  }

  function loadNodesFromBackend() {
    setNodesLoaded(false);
    setIsLoading(true);
    axios
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
        setNodes(data);
      })
      .catch((error) => console.log(error))
      .finally(() => {
        setIsLoading(false);
        setNodesLoaded(true);
      });
  }

  function removeAllMarkersFromMap() {
    if (markers.length > 0) {
      for (let i = 0; i < markers.length; i++) {
        if (markers[i]) {
          map.removeLayer(markers[i]);
        }
      }
    }
    setMarkers(null);
  }

  function createNewMarkers() {
    setMarkersLoaded(false);
    let tempMarkers = [];
    if (nodes) {
      for (let i = 0; i < nodes.length; i++) {
        if (nodes[i].nodeType === "scratchAMapNode") {
          tempMarkers[i] = L.marker([nodes[i].latitude, nodes[i].longitude], {
            icon: samNodeIcon,
            key: nodes[i].id,
          });
        } else {
          tempMarkers[i] = L.marker([nodes[i].latitude, nodes[i].longitude], {
            icon: nodeIcon,
            key: nodes[i].id,
          });
        }
      }
      setMarkers(tempMarkers);
      setMarkersLoaded(true);
    }
  }

  function checkIfPlayerIsNearMarkers() {
    if (markers) {
      let uncollectedMarkers = [];
      let uncollectedNodes = [];
      let collectedNodes = [];

      for (let i = 0; i < markers.length; i++) {
        if (markers[i]) {
          if (
            map.distance(playerLocation.latlng, markers[i].getLatLng()) <= 20
          ) {
            map.removeLayer(markers[i]);
            playerPoints += 1;
            setPoints(playerPoints);
            collectedNodes.push(nodes[i]);
          } else {
            uncollectedMarkers.push(markers[i]);
            uncollectedNodes.push(nodes[i]);
          }
        }
      }
      setMarkers(uncollectedMarkers);
      setNodes(uncollectedNodes);
      if (collectedNodes.length > 0) {
        saveCollectedNodes(collectedNodes);
        savePlayerPoints();
      }
    }
  }

  function savePlayerPoints() {
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

  function saveCollectedNodes(collectedNodes) {
    axios
      .post(`/api/mapData/saveNodes`, { collectedNodes }, config)
      .then((response) => {
        return response.data;
      })
      .catch((error) => console.log(error));
  }
  return null;
}
