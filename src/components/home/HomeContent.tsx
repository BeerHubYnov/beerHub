import Lottie from "lottie-react";
import "./../../App.css";
import drinkFill from "../../assets/drink-fill.json";
import { Link } from "react-router-dom";

const HomeContent: React.FC = () => {
  return (
    <>
      <div className="anim-home">
        <h3>Trouver les évènements</h3>
        <Lottie animationData={drinkFill} style={{ width: "350px", height: "350px" }} />
        <Link to="/bars" >Liste des bars</Link>
        <Link to="/events" >Liste des évents</Link>
      </div>
    </>
  );
};

export default HomeContent;
