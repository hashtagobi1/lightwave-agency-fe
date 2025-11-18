"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

function SpinningTorus() {
  const meshRef = useRef<THREE.Mesh | null>(null);

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x += delta * 0.25;
    meshRef.current.rotation.y += delta * 0.35;
  });

  return (
    <mesh ref={meshRef} castShadow receiveShadow>
      {/* TorusKnot feels nicely “light-wave” and abstract */}
      <torusKnotGeometry args={[1, 0.35, 220, 32]} />
      <meshStandardMaterial
        metalness={0.75}
        roughness={0.15}
        color={"#111827"} // slate-ish base
        emissive={"#38bdf8"} // cyan light
        emissiveIntensity={1.1}
      />
    </mesh>
  );
}

export function LightWaveScene() {
  return (
    <div className="h-full w-full rounded-2xl bg-gradient-to-b from-black via-black/90 to-black/80 overflow-hidden border border-black/10">
      <Canvas
        shadows
        camera={{ position: [0, 0, 4], fov: 45 }}
        className="h-full w-full"
      >
        {/* Soft background color for the scene */}
        <color attach="background" args={["#020617"]} />

        {/* Lights */}
        <ambientLight intensity={0.25} />
        <directionalLight
          castShadow
          intensity={1.1}
          position={[2.5, 3, 4]}
          color={"#e5e5e5"}
        />
        <pointLight intensity={1.2} position={[-3, -2, -4]} color={"#38bdf8"} />

        {/* Very soft ground “bounce” light */}
        <spotLight
          intensity={0.7}
          position={[0, -4, 0]}
          angle={0.8}
          penumbra={1}
          color={"#22c55e"}
        />

        <SpinningTorus />

        {/* Minimal controls: disable zoom, no crazy spin */}
        <OrbitControls
          enablePan={false}
          enableZoom={false}
          enableDamping
          dampingFactor={0.08}
          autoRotate
          autoRotateSpeed={0.45}
        />
      </Canvas>
    </div>
  );
}
