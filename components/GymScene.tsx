"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Center, useTexture } from "@react-three/drei";
import * as THREE from "three";

function LogoMesh() {
  const texture = useTexture("/assets/io-logo-nobg.png");
  texture.colorSpace = THREE.SRGBColorSpace;

  return (
    <Center>
      <mesh>
        <planeGeometry args={[2.6, 2.6]} />
        <meshBasicMaterial
          map={texture}
          transparent
          alphaTest={0.5}
          side={THREE.DoubleSide}
        />
      </mesh>
    </Center>
  );
}

export default function GymScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 4], fov: 50 }}
      dpr={1}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
        pointerEvents: "none",
      }}
    >
      <color attach="background" args={["#000000"]} />
      <Suspense fallback={null}>
        <LogoMesh />
      </Suspense>
    </Canvas>
  );
}
