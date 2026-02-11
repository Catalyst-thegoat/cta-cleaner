import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, Stars, Float } from '@react-three/drei';
import { useRef, useMemo } from 'react';
import * as THREE from 'three';

function AnimatedOrb({ color, position, scale = 1 }: { color: string; position: [number, number, number]; scale?: number }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <Sphere ref={meshRef} args={[1 * scale, 64, 64]} position={position}>
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.3}
          roughness={0.1}
          metalness={0.8}
          transparent
          opacity={0.8}
        />
      </Sphere>
    </Float>
  );
}

function FloatingParticles() {
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < 50; i++) {
      const x = (Math.random() - 0.5) * 20;
      const y = (Math.random() - 0.5) * 20;
      const z = (Math.random() - 0.5) * 20;
      const scale = Math.random() * 0.3 + 0.1;
      temp.push({ x, y, z, scale });
    }
    return temp;
  }, []);

  return (
    <group>
      {particles.map((particle, i) => (
        <mesh key={i} position={[particle.x, particle.y, particle.z]}>
          <sphereGeometry args={[particle.scale, 16, 16]} />
          <meshStandardMaterial
            color="#c084fc"
            emissive="#c084fc"
            emissiveIntensity={0.8}
            transparent
            opacity={0.6}
          />
        </mesh>
      ))}
    </group>
  );
}

function GradientOrbs() {
  const orbs = useMemo(() => {
    return [
      { color: '#8b5cf6', position: [5, 5, -10] as [number, number, number] },
      { color: '#ec4899', position: [-5, -3, -8] as [number, number, number] },
      { color: '#06b6d4', position: [3, -4, -12] as [number, number, number] },
    ];
  }, []);

  return (
    <>
      {orbs.map((orb, i) => (
        <pointLight
          key={i}
          color={orb.color}
          intensity={2}
          distance={15}
          position={orb.position}
        />
      ))}
    </>
  );
}

export default function Background3D() {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas camera={{ position: [0, 0, 8], fov: 60 }}>
        <ambientLight intensity={0.3} />
        <GradientOrbs />
        <AnimatedOrb color="#8b5cf6" position={[2, 0, -5]} scale={2} />
        <AnimatedOrb color="#ec4899" position={[-3, 1, -8]} scale={1.5} />
        <AnimatedOrb color="#06b6d4" position={[0, -2, -10]} scale={0.8} />
        <FloatingParticles />
        <Stars radius={100} depth={50} count={1000} factor={4} fade speed={1} />
        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
      </Canvas>
    </div>
  );
}
