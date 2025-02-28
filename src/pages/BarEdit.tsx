import React from "react";
import { useParams } from "react-router-dom";
import BarEditComponent from "./../components/bar-edit/BarEditComponent";

const BarEdit: React.FC = () => {
  const { id } = useParams<{ id?: string }>();
  if (!id) {
    return <p>Erreur : ID du bar introuvable.</p>;
  }

  return (
    <>
      <h2>Modifier le Bar</h2>
      <BarEditComponent barId={id} />
    </>
  );
};

export default BarEdit;
