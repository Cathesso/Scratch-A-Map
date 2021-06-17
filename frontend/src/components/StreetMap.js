import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";

function MyComponent() {
  const map = useMapEvents({
    click: () => {
      map.locate();
    },
    locationfound: (location) => {
      map.flyTo([location.latitude, location.longitude], 18);
    },
  });
  return null;
}

export default function StreetMap() {
  return (
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
  );
}
