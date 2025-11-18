// src/components/site/HeroCanvas.tsx
"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Text, Environment, Stars } from "@react-three/drei";
import * as THREE from "three";
import { useRef } from "react";

function RotatingLW() {
  const ref = useRef<THREE.Mesh | null>(null);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.getElapsedTime();
    ref.current.rotation.y = t * 0.5;
    ref.current.rotation.x = Math.sin(t * 0.4) * 0.25;
  });

  return (
    <Text
      ref={ref as any}
      fontSize={1.1}
      letterSpacing={0.04}
      anchorX="center"
      anchorY="middle"
      depth={0.6}
      bevelEnabled
      bevelThickness={0.18}
      bevelSize={0.08}
      bevelSegments={16}
      curveSegments={32}
    >
      LW
      <meshPhysicalMaterial
        color="#f9fafb"
        roughness={0.25}
        metalness={0.4}
        clearcoat={1}
        clearcoatRoughness={0.08}
        sheen={1}
        sheenColor={new THREE.Color("#ffffff")}
        side={THREE.DoubleSide}
      />
    </Text>
  );
}

type OrbitingSphereProps = {
  radius: number;
  height: number;
  speed: number;
  offset: number;
  color: string;
  scale: number;
};

function OrbitingSphere({
  radius,
  height,
  speed,
  offset,
  color,
  scale,
}: OrbitingSphereProps) {
  const planetRef = useRef<THREE.Group | null>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const angle = t * speed + offset;

    const x = Math.cos(angle) * radius;
    const z = Math.sin(angle) * radius;
    const y = height + Math.sin(t * 1.3 + offset) * 0.18;

    if (planetRef.current) {
      planetRef.current.position.set(x, y, z);
      planetRef.current.rotation.y = angle + Math.PI / 2;
    }
  });

  return (
    <group ref={planetRef} scale={scale}>
      <mesh>
        <sphereGeometry args={[1, 28, 28]} />
        <meshStandardMaterial metalness={0.65} roughness={0.35} color={color} />
      </mesh>
    </group>
  );
}

function OrbitingField() {
  const planets: OrbitingSphereProps[] = [
    // Mercury
    {
      radius: 1.7,
      height: 0.1,
      speed: 1.2,
      offset: 0,
      color: "#b1a39b",
      scale: 0.22,
    },
    // Venus
    {
      radius: 2.0,
      height: -0.2,
      speed: 1.0,
      offset: 0.8,
      color: "#c7a869",
      scale: 0.32,
    },
    // Earth
    {
      radius: 2.3,
      height: 0.2,
      speed: 0.85,
      offset: 1.6,
      color: "#2e66b8",
      scale: 0.34,
    },
    // Mars
    {
      radius: 2.6,
      height: -0.3,
      speed: 0.78,
      offset: 2.4,
      color: "#b4431f",
      scale: 0.28,
    },
    // Jupiter
    {
      radius: 3.0,
      height: 0.4,
      speed: 0.6,
      offset: 3.2,
      color: "#d6b08c",
      scale: 0.55,
    },
    // Saturn
    {
      radius: 3.3,
      height: -0.4,
      speed: 0.52,
      offset: 1.3,
      color: "#d9c48e",
      scale: 0.48,
    },
    // Uranus
    {
      radius: 3.6,
      height: 0.3,
      speed: 0.44,
      offset: 2.8,
      color: "#7fcad3",
      scale: 0.38,
    },
    // Neptune
    {
      radius: 3.9,
      height: -0.1,
      speed: 0.38,
      offset: 4.4,
      color: "#4167e0",
      scale: 0.36,
    },
  ];

  return (
    <>
      {planets.map((p, i) => (
        <OrbitingSphere key={i} {...p} />
      ))}
    </>
  );
}

export function HeroCanvas() {
  return (
    <div className="h-72 sm:h-80 rounded-2xl border border-black/10 bg-black overflow-hidden">
      <Canvas
        camera={{ position: [0, 0.6, 5.4], fov: 45 }}
        style={{ background: "#020617" }} // deep slate / cosmic
      >
        {/* stronger cosmic background */}
        <color attach="background" args={["#020617"]} />
        <Stars
          radius={60}
          depth={50}
          count={1200}
          factor={3}
          fade
          speed={0.3}
        />

        {/* lighting */}
        <ambientLight intensity={0.7} />
        <directionalLight position={[3, 4, 5]} intensity={1.2} />
        <directionalLight position={[-4, -3, -5]} intensity={0.5} />

        <Environment preset="city" />

        <RotatingLW />
        <OrbitingField />

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate={false}
          enableDamping
          dampingFactor={0.08}
        />
      </Canvas>
    </div>
  );
}
