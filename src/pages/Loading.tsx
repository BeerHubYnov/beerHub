import Lottie from "lottie-react";
import drink from "../assets/drink.json";
const Loading: React.FC = () => {
  return (
    <div className="loader-container">
      <div className="loader-wrap">
        <Lottie animationData={drink} />

        <p className="loader-text">Chargement en cours</p>
      </div>
    </div>
  );
};

export default Loading;
