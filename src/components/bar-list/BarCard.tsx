import { NavLink } from "react-router-dom";
import "./BarCard.css";
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
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

      <NavLink to={`/bar/${bar.id}`} className="bar-btn">
        <RemoveRedEyeIcon/>   Voir
      </NavLink>
      <br />
    </div>
  );
};

export default BarCard;
