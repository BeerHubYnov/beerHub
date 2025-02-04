import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Importation de l'icône d'ombre par défaut de Leaflet
import markerShadowPng from "leaflet/dist/images/marker-shadow.png";

// Définition de l'interface Bar
interface Bar {
  id: string;
  name: string;
  localisationX: number;
  localisationY: number;
}

const Dashboard: React.FC = () => {
  const [bars, setBars] = useState<Bar[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Récupérer les données de tous les bars depuis le backend
  useEffect(() => {
    const fetchBars = async () => {
      try {
        const response = await fetch("http://localhost:3000/bar");
        if (!response.ok) {
          throw new Error("Erreur lors de la récupération des bars.");
        }
        const data: Bar[] = await response.json();
        setBars(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBars();
  }, []);

  // Définir un centre par défaut pour la carte
  const defaultCenter: [number, number] =
    bars.length > 0 ? [bars[0].localisationX, bars[0].localisationY] : [48.8566, 2.3522];

  // Création d'un icône personnalisé en rouge pour les marqueurs
  const customIcon = L.icon({
    // Utilisation de l'image d'icône rouge depuis leaflet-color-markers
    iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
    shadowUrl: markerShadowPng,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
  });

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>Erreur : {error}</p>;

  return (
    <div>
      <h2>Dashboard</h2>
      <MapContainer
        center={defaultCenter}
        zoom={11}
        style={{ height: "500px", width: "100%" }}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {bars.map((bar) => (
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

export default Dashboard;
