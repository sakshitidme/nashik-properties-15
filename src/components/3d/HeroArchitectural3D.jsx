import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, OrbitControls, MeshDistortMaterial, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

const ArchitecturalBuilding = () => {
  const groupRef = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.15;
    }
  });

  return (
    <group ref={groupRef} position={[0, -0.5, 0]}>
      {/* Central Glass Tower Main Structure */}
      <mesh position={[0, 1.5, 0]}>
        <boxGeometry args={[1.8, 4.5, 1.8]} />
        <meshPhysicalMaterial
          color="#d4af37"
          roughness={0.1}
          metalness={0.8}
          transmission={0.6}
          thickness={1.2}
          transparent
          opacity={0.7}
          wireframe={false}
        />
      </mesh>

      {/* Wireframe Outer Armor */}
      <mesh position={[0, 1.5, 0]}>
        <boxGeometry args={[1.85, 4.55, 1.85]} />
        <meshStandardMaterial
          color="#f3d068"
          wireframe
          emissive="#d4af37"
          emissiveIntensity={0.6}
        />
      </mesh>

      {/* Secondary Structural Blocks */}
      <mesh position={[-1.4, 0.6, 0.4]}>
        <boxGeometry args={[1.2, 2.8, 1.2]} />
        <meshStandardMaterial
          color="#1e293b"
          metalness={0.9}
          roughness={0.2}
        />
      </mesh>
      
      <mesh position={[1.4, 0.8, -0.4]}>
        <boxGeometry args={[1.2, 3.2, 1.2]} />
        <meshStandardMaterial
          color="#0f172a"
          metalness={0.9}
          roughness={0.3}
          wireframe={false}
        />
      </mesh>

      {/* Gold Glowing Floor Ribbons */}
      {[-0.5, 0.5, 1.5, 2.5, 3.5].map((yVal, idx) => (
        <mesh key={idx} position={[0, yVal, 0]}>
          <boxGeometry args={[2.0, 0.08, 2.0]} />
          <meshStandardMaterial
            color="#ffe89c"
            emissive="#d4af37"
            emissiveIntensity={1.2}
          />
        </mesh>
      ))}

      {/* Base Podium Floor */}
      <mesh position={[0, -0.8, 0]}>
        <boxGeometry args={[5, 0.2, 5]} />
        <meshStandardMaterial color="#0b0f17" metalness={0.9} roughness={0.1} />
      </mesh>
    </group>
  );
};

const FloatingGoldNodes = () => {
  const particlesRef = useRef();

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y += 0.002;
    }
  });

  const points = React.useMemo(() => {
    const p = [];
    for (let i = 0; i < 40; i++) {
      p.push({
        position: [
          (Math.random() - 0.5) * 12,
          (Math.random() - 0.5) * 8 + 1,
          (Math.random() - 0.5) * 12
        ],
        scale: Math.random() * 0.15 + 0.05
      });
    }
    return p;
  }, []);

  return (
    <group ref={particlesRef}>
      {points.map((pt, i) => (
        <Float key={i} speed={2} rotationIntensity={1} floatIntensity={2}>
          <mesh position={pt.position}>
            <sphereGeometry args={[pt.scale, 16, 16]} />
            <meshStandardMaterial
              color="#e6c667"
              emissive="#d4af37"
              emissiveIntensity={1.5}
            />
          </mesh>
        </Float>
      ))}
    </group>
  );
};

export const HeroArchitectural3D = () => {
  return (
    <div className="w-full h-full min-h-[220px] sm:min-h-[350px] lg:min-h-[450px] relative pointer-events-auto">
      <Canvas
        gl={{ antialias: true, alpha: true }}
        className="w-full h-full bg-transparent"
      >
        <PerspectiveCamera makeDefault position={[5, 4, 7]} fov={45} />
        <ambientLight intensity={0.8} />
        <directionalLight position={[10, 15, 10]} intensity={1.5} color="#ffffff" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#d4af37" />

        <ArchitecturalBuilding />
        <FloatingGoldNodes />

        <OrbitControls
          enableZoom={false}
          autoRotate={true}
          autoRotateSpeed={0.8}
          maxPolarAngle={Math.PI / 2 + 0.1}
          minPolarAngle={Math.PI / 4}
        />
      </Canvas>
      
      {/* Background Radial Glow */}
      <div className="absolute inset-0 pointer-events-none bg-radial from-amber-500/10 via-transparent to-transparent blur-3xl -z-10" />
    </div>
  );
};
