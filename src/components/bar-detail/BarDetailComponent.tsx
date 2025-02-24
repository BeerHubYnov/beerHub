import React from "react";
import MapComponent from "../Map/MapComponent";

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
      <div style={{ height: "400px", width: "100%" }}>
        <MapComponent 
          lat={bar.localisationX} 
          lng={bar.localisationY} 
          markers={[bar]} 
        />
      </div>
    </div>
  );
};

export default BarDetailComponent;