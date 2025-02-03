import { useParams } from "react-router-dom";
import BarDeleteComponent from "../components/bar-delete/BarDeleteComponent";

const BarDeletePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  if (!id) {
    return <p>Erreur : ID du bar non trouvé.</p>;
  }

  return <BarDeleteComponent barId={id} />;
};

export default BarDeletePage;
