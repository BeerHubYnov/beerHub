import React from "react";
import "./BarDetailComponent.css";

interface Bar {
  id: string;
  name: string;
  description: string;
  happyHoure: string;
  localisationX: number;
  localisationY: number;
}

const BarDetailComponent: React.FC<{ bar: Bar }> = ({ bar }) => {
  return (
    <div className="bar-detail">
      <h2>{bar.name}</h2>
      <p><strong>Description :</strong> {bar.description}</p>
      <p><strong>Happy Hour :</strong> {bar.happyHoure}</p>
      <p><strong>Localisation :</strong> {bar.localisationX}, {bar.localisationY}</p>
    </div>
  );
};

export default BarDetailComponent;
