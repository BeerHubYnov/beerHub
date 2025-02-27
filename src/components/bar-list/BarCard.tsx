import { NavLink } from "react-router-dom";
import "./BarCard.css";

interface Bar {
  id: string;
  name: string;
  description: string;
}

const BarCard: React.FC<{ bar: Bar }> = ({ bar }) => {
  return (
    <div className="bar-card" data-testid="bar-card">
      <h3>{bar.name}</h3>
      <p>
        <strong>Description :</strong> {bar.description}
      </p>

      <NavLink to={`/bar/${bar.id}`} className="homeLink">Voir les détails</NavLink>
      <br />
    </div>
  );
};

export default BarCard;
