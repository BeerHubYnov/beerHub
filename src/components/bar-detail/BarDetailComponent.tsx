import React from "react";
import MapComponent from "./MapComponent";

interface Bar {
  id: string;
  name: string;
  description: string;
  happyHoure: string;
  localisationX: number;
  localisationY: number;
}

interface BarDetailComponentProps {
  bar: Bar;
}

const BarDetailComponent: React.FC<BarDetailComponentProps> = ({ bar }) => {
  return (
    <div>
      <h2>{bar.name}</h2>
      <p>{bar.description}</p>
      <p>Happy Hour : {bar.happyHoure}</p>
      <h3>Localisation</h3>
      <MapComponent lat={bar.localisationX} lng={bar.localisationY} />
    </div>
  );
};

export default BarDetailComponent;
