import React from "react";
import BarListComponent from "./../components/bar-list/BarListComponent";
import BarsMapPage from "./BarsMapPage";

const BarList: React.FC = () => {
  return (
    <div className="profil">
      <h2>Liste des Bars</h2>
      <div className="bars-page">
        {" "}
        <BarListComponent />
        <BarsMapPage />
      </div>
    </div>
  );
};
export default BarList;
