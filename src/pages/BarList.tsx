import React from "react";
import BarListComponent from "./../components/bar-list/BarListComponent";
import BarsMapPage from "./BarsMapPage";
import "./BarList.css";

const BarList: React.FC = () => {
  return (
    <div className="profil">
      <h2>Liste des Bars</h2>
      <div className="bars-page">
  <div className="bar-list-container">
    <BarListComponent />
  </div>
  <div className="bars-map">
    <BarsMapPage />
  </div>
</div>

    </div>
  );
};
export default BarList;
