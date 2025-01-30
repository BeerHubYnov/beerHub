import "./BarCard.css";

interface Bar {
  id: string;
  name: string;
  description: string;
  happyHoure: string;
  localisationX: number;
  localisationY: number;
}

const BarCard: React.FC<{ bar: Bar }> = ({ bar }) => {
  return (
    <div className="bar-card">
      <h3>{bar.name}</h3>
      <p><strong>Description :</strong> {bar.description}</p>
      <p><strong>Happy Hour :</strong> {bar.happyHoure}</p>
      <p><strong>Localisation :</strong> {bar.localisationX}, {bar.localisationY}</p>
    </div>
  );
};

export default BarCard;
