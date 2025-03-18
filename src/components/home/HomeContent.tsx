import Lottie from "lottie-react";
import "./../../App.css";
import drinkFill from "../../assets/drink-fill.json";
import { Link } from "react-router-dom";

const HomeContent: React.FC = () => {
  return (
    <div className="anim-home">
      <h2>Trouver les évènements</h2>

      <div className="homeBtn">
        <Link to="/bars" className="homeLink">
          LISTE DES BARS
        </Link>
        <Lottie
          animationData={drinkFill}
          style={{ width: "350px", height: "350px" }}
        />
        <Link to="/events" className="homeLink">
          LISTE DES EVENTS
        </Link>
      </div>
    </div>
  );
};

export default HomeContent;
