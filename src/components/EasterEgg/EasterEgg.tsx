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
      const topThreshold = 100;
      const rightThreshold = 100;
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
        </div>
      )}
    </>
  );
};

export default EasterEgg;
