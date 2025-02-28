import Lottie from "lottie-react";
import "./../../App.css";
import drinkFill from "../../assets/drink-fill.json";
import { Link } from "react-router-dom";

const HomeContent: React.FC = () => {
  return (
    <div className="anim-home">
      <h3>Trouver les évènements</h3>
      <Lottie
        animationData={drinkFill}
        style={{ width: "350px", height: "350px" }}
      />
      <div className="homeBtn">
        <Link to="/bars" className="homeLink">
          Liste des bars
        </Link>
        <Link to="/events" className="homeLink">
          Liste des évents
        </Link>
      </div>
    </div>
  );
};

export default HomeContent;
