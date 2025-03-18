import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

interface Bar {
  id: string;
  name: string;
  localisationX: number;
  localisationY: number;
}

interface MapComponentProps {
  lat: number;
  lng: number;
  markers: Bar[];
}

const MapComponent: React.FC<MapComponentProps> = ({ lat, lng, markers }) => {
  return (
    <MapContainer
      center={[lat, lng]}
      zoom={5}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        attribution="&copy; OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {markers.map((marker) => (
        <Marker
          key={marker.id}
          position={[marker.localisationX, marker.localisationY]}
        >
          <Popup>{marker.name}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapComponent;
