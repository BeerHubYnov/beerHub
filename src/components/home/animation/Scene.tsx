import { Html, useProgress } from "@react-three/drei";
import { Canvas, useLoader } from "@react-three/fiber";
import React, { Suspense } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

function Loader() {
  const { progress } = useProgress();
  return <Html center>{progress.toFixed(0)}% loaded</Html>;
}

const Model: React.FC = () => {
  const gltf = useLoader(GLTFLoader, "/models/beer.glb");
  return <primitive object={gltf.scene} position={[1, -1, -1]} scale={0.09} />;
};

const Scene: React.FC = () => {
  return (
    <Canvas camera={{ position: [0, 2, 5] }} shadows>
      <Suspense fallback={<Loader />}>
        {/* Lumière directionnelle */}
        <directionalLight position={[1.3, 2.0, 2.4]} castShadow intensity={Math.PI} />

        {/* Ajout du modèle */}
        <Model />
      </Suspense>
    </Canvas>
  );
};

export default Scene;
