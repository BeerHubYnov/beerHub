import React from "react";
import { Card, CardContent, CardHeader } from "../ui/card";
import EventMapComponent from "./EventMapComponent";

interface MapCardProps {
  lat: number;
  lng: number;
  markers: {
    id: string;
    name: string;
    localisationX: number;
    localisationY: number;
  }[];
}

const cardMapStyle: React.CSSProperties = {
  height: "100vh",
  width: "100vh",
  border: "2px solid #e5e7eb",
  borderRadius: "8px",
  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
  overflow: "hidden",
};

const leftContainerStyle: React.CSSProperties = {
  marginLeft: "3rem",
  marginBottom: "3rem",
};

const EventMapCard: React.FC<MapCardProps> = ({ lat, lng, markers }) => {
  if (markers.length === 0) return <p>Aucun événement trouvé.</p>;

  return (
    <div className="flex items-center w-full min-h-screen bg-gray-100 p-4">
      <div style={leftContainerStyle}>
        <Card className="w-[400px] h-[50vh] shadow-lg rounded-lg border border-gray-300 bg-white overflow-hidden flex flex-col">
          <CardHeader>
            <div className="text-center text-xl font-bold">
              Carte des Events
            </div>
          </CardHeader>
          <CardContent>
            <div className="relative w-full" style={cardMapStyle}>
              <EventMapComponent lat={lat} lng={lng} markers={markers} />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EventMapCard;
