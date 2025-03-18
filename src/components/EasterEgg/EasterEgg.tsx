import React, { useState, useEffect, useRef } from "react";
import "./EasterEgg.css";

const EasterEgg: React.FC = () => {
  const [easterEggTriggered, setEasterEggTriggered] = useState<boolean>(false);
  const ctrlPressedRef = useRef<boolean>(false);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent): void => {
      if (event.key === "Control") {
        ctrlPressedRef.current = true;
      }
    };

    const handleKeyUp = (event: KeyboardEvent): void => {
      if (event.key === "Control") {
        ctrlPressedRef.current = false;
        setEasterEggTriggered(false);
      }
    };

    const handleMouseMove = (event: MouseEvent): void => {
      const topThreshold = 10;
      const rightThreshold = 10;
      const windowWidth = window.innerWidth;

      const isInArea =
        ctrlPressedRef.current &&
        event.clientY < topThreshold &&
        windowWidth - event.clientX < rightThreshold;
      setEasterEggTriggered(isInArea);
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);
    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <>
      {easterEggTriggered && (
        <div className="easterEgg">
          Félicitations, vous avez trouvé l'easter egg !
          <img src="https://media.istockphoto.com/id/179575149/fr/vectoriel/bien-jou%C3%A9.jpg?s=1024x1024&w=is&k=20&c=2DLG-AIoHSPGQeDpML9dOgW3-m17ABDlL7rIX3poYnw=" 
          alt="Bien joué !" 
          className="imgEasterEgg"/>
        </div>
      )}
    </>
  );
};

export default EasterEgg;
