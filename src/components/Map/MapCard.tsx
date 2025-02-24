import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import MapComponent from "./MapComponent";

interface Bar {
  id: string;
  name: string;
  localisationX: number;
  localisationY: number;
}

interface MapCardProps {
  lat: number;
  lng: number;
  markers: Bar[];
}

const MapCard: React.FC<MapCardProps> = ({ lat, lng, markers }) => {
  return (
    <Card className="w-full max-w-3xl shadow-lg rounded-2xl">
      <CardHeader>
        <CardTitle>Carte des Bars</CardTitle>
      </CardHeader>
      <CardContent>
        <MapComponent lat={lat} lng={lng} markers={markers} />
      </CardContent>
    </Card>
  );
};

export default MapCard;
