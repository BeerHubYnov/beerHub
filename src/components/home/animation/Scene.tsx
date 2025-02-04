import { Html, useProgress } from "@react-three/drei";
import { Canvas, useLoader } from "@react-three/fiber";
import React, { Suspense } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

function Loader() {
  const { progress } = useProgress();
  console.log(progress);
  return <Html center>{progress} % loaded</Html>;
}

const Scene: React.FC = () => {
  const gltf = useLoader(GLTFLoader, "/models/beer.glb");

  return (
    <Suspense fallback={<Loader />}>
      <Canvas camera={{ position: [-0.5, 0.1, 0.2] }} shadows>
        <directionalLight
          position={[1.3, -2.0, -2.4]}
          castShadow
          intensity={Math.PI * 1}
        />
        <primitive
          object={gltf.scene}
          position={[0, 1, 0]}
          scale={[0.07, 0.07, 0.07]}
          rotation={[8, -6, 7]} 
          children-0-castShadow
        />

      </Canvas>
    </Suspense>
  );
};

export default Scene;
