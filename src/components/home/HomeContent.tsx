import Lottie from "lottie-react";
import "./../../App.css";
import drinkFill from "../../assets/drink-fill.json";
const HomeContent: React.FC = () => {
  return (
    <>
      <div className="anim-home">
        <h3>Trouver les évènements</h3>
        <Lottie animationData={drinkFill} style={{ width: "350px", height: "350px" }} />
      </div>
    </>
  );
};

export default HomeContent;
