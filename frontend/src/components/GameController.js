import axios from "axios";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthContext";
import coin from "../img/coin.png";
import explorer from "../img/explorer.png";
import treasureChest from "../img/treasure-chest.png";
import L from "leaflet";

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

export default function GameController({ points, setIsLoading, useMap }) {
  const { token } = useContext(AuthContext);
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  let playerPoints = points;
  const map = useMap();
  const [nodes, setNodes] = useState(null); //OSM-Nodes
  const [markers, setMarkers] = useState(null); //let markers = []; //OSM-Nodes converted to Markers
  const [markersLoaded, setMarkersLoaded] = useState(false);
  const [playerBounds, setPlayerBounds] = useState(false); //let playerBounds = ""; //Area in which the user moves without new nodes being loaded
  const [mapBounds, setMapBounds] = useState(null); //let mapBounds = ""; //Area for which the nodes are loaded
  const [boundsLoaded, setBoundsLoaded] = useState(null);
  const [playerLocation, setPlayerLocation] = useState(null);
  const [nodesLoaded, setNodesLoaded] = useState(false);
  const { jwtDecoded } = useContext(AuthContext);

  useEffect(() => {
    console.log("UseEffect: OnPageLoad");
    setIsLoading(true);
    map.locate();
    map.on("locationfound", onLocationFound);
    map.on("locationerror", onLocationError);

    const timer = setInterval(() => {
      map.locate();
      console.log("Map Locate-Timer used");
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
      setBoundsLoaded(null);
      setPlayerLocation(null);
      setNodesLoaded(false);
    };
  }, []); //eslint-disable-line react-hooks/exhaustive-deps
  // When page is loaded: Locate Player + Set Timer

  useEffect(() => {
    console.log("Use-Effect: playerLocation");
    if (playerLocation) {
      if (!mapBounds) {
        loadMapBounds();
      } else if (!checkIfPlayerIsWithinBounds()) {
        loadMapBounds();
      } else {
        checkIfPlayerIsNearMarkers();
      }
    }
  }, [playerLocation]); //eslint-disable-line react-hooks/exhaustive-deps
  // When PlayerLocation changed: Check Bounds / Markers

  useEffect(() => {
    console.log("Use-Effect: mapBounds");
    if (mapBounds && boundsLoaded) {
      loadNodesFromBackend();
      setBoundsLoaded(false);
    }
  }, [boundsLoaded]); //eslint-disable-line react-hooks/exhaustive-deps
  // When mapBounds set: Load Nodes

  useEffect(() => {
    console.log("Use-Effect: nodesLoaded");
    if (nodesLoaded === true) {
      if (markers) {
        removeMarkersFromMap();
        createMarkers();
      } else {
        createMarkers();
      }
    }
  }, [nodesLoaded]); //eslint-disable-line react-hooks/exhaustive-deps
  // When new nodes loaded: Create Markers

  useEffect(() => {
    console.log("Use-Effect: markersLoaded");
    if (markers && markersLoaded) {
      markers.map((marker) => map.addLayer(marker));
      setMarkersLoaded(false);
    }
  }, [markersLoaded]); //eslint-disable-line react-hooks/exhaustive-deps
  // When Markers created: Add to Map

  function onLocationFound(userLocation) {
    console.log("Function: onLocationFound");
    setPlayerLocation(userLocation);
    map.removeLayer(userMarker);
    //setUserMarker(L.marker(userLocation.latlng, { icon: userIcon }));
    userMarker = L.marker(userLocation.latlng, { icon: userIcon });
    map.addLayer(userMarker);
    map.panTo(userLocation.latlng, 20);
    map.setZoom(20);
  }

  function onLocationError(error) {
    console.log("Function: onLocationError");
    alert(error.message);
  }

  function loadMapBounds() {
    console.log("Function: loadMapBounds");
    function getMapBounds() {
      map.setZoom(16);
      return map.getBounds();
    }
    function getPlayerBounds() {
      map.setZoom(18);
      return map.getBounds();
    }
    setMapBounds(getMapBounds());
    setPlayerBounds(getPlayerBounds());
    setBoundsLoaded(true);
  }

  function checkIfPlayerIsWithinBounds() {
    console.log("Function: checkIfPlayerIsWithinBounds");
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
    console.log("Function: loadNodesFromBackend");
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

  function removeMarkersFromMap() {
    console.log("Function: removeMarkersFromMap");
    if (markers.length > 0) {
      for (let i = 0; i < markers.length; i++) {
        if (markers[i]) {
          map.removeLayer(markers[i]);
        }
      }
    }
    setMarkers(null);
  }

  function createMarkers() {
    console.log("Function: createMarkers");
    setMarkersLoaded(false);
    let tempMarkers = [];
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

  function checkIfPlayerIsNearMarkers() {
    console.log("Function: checkIfPlayerIsNearMarkers");
    if (markers) {
      let uncollectedMarkers = [];
      let uncollectedNodes = [];
      let collectedNodes = [];

      for (let i = 0; i < markers.length; i++) {
        if (markers[i]) {
          if (
            map.distance(playerLocation.latlng, markers[i].getLatLng()) <= 50
          ) {
            console.log("Try to remove Marker");
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
      } //END
      setMarkers(uncollectedMarkers);
      setNodes(uncollectedNodes);
      if (collectedNodes.length > 0) {
        saveCollectedNodes(collectedNodes);
        savePlayerPoints();
      }
    }
  }

  function savePlayerPoints() {
    console.log("Function: savePlayerPoints");
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
    console.log("Function: saveCollectedNodes");
    axios
      .post(`/api/mapData/saveNodes`, { collectedNodes }, config)
      .then((response) => {
        return response.data;
      })
      .catch((error) => console.log(error));
  }

  return null;
}
