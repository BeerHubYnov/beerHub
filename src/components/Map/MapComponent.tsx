import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Importation des images par défaut de Leaflet pour le marqueur
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import markerShadowPng from "leaflet/dist/images/marker-shadow.png";

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
  const customIcon = L.icon({
    iconUrl: markerIconPng,
    shadowUrl: markerShadowPng,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
  });

  return (
    <div style={{ height: "500px", width: "100%" }}>
      <MapContainer
        center={[lat, lng]}
        zoom={5}
        scrollWheelZoom={false}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {markers.map((bar) => (
          <Marker
            key={bar.id}
            position={[bar.localisationX, bar.localisationY]}
            icon={customIcon}
          >
            <Popup>{bar.name}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default MapComponent;
