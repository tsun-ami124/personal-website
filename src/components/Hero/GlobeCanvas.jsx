import { useRef, useEffect, useState } from "react";
import * as THREE from "three";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { TextureLoader } from "three/src/loaders/TextureLoader";
import { motion } from "framer-motion";

export function GlobeCanvas() {
  const containerRef = useRef(null);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const opacity = Math.max(0, 1 - scrollY / 400);

  return (
    <motion.div
      ref={containerRef}
      className="absolute inset-0 z-0 w-full h-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: opacity }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <Canvas
        camera={{ position: [0, -0.3, 6.5], fov: 36 }}
        style={{ width: "100%", height: "100%", background: "transparent" }}
      >
        {/* Keep a subtle light for atmosphere glow */}
        <ambientLight intensity={0.35} />

        <Globe />
      </Canvas>
    </motion.div>
  );
}

function Globe() {
  const meshRef = useRef(null);

  // Load single dot-map texture for the globe (used as color map)
  const [dotMap] = useLoader(TextureLoader, ["/assets/dot_map_hk.png"]);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.2 * delta;
    }
  });

  const scale = 1.95;

  return (
    <group position={[1.2, 0, 0]}>
      <mesh ref={meshRef} scale={scale}>
        <sphereGeometry args={[1, 64, 64]} />
        {/* Use the updated dot map as the full color texture */}
        <meshStandardMaterial
          map={dotMap}
          metalness={0.1}
          roughness={0.9}
        />
      </mesh>

      <mesh scale={scale + 0.08}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshStandardMaterial
          color="#d4d4d4"
          transparent
          opacity={0.03}
          side={THREE.BackSide}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}
