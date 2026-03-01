import { useEffect, useRef } from "react";
import * as THREE from "three";
import { motion } from "framer-motion";

const HK_LAT = 22.3193;
const HK_LON = 114.1694;

export function RotatingEarthWithMarker() {
  const containerRef = useRef(null);
  const frameRef = useRef(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 4;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio || 1);
    container.appendChild(renderer.domElement);

    const radius = 1.2;
    const globeGeom = new THREE.SphereGeometry(radius, 64, 64);
    const globeMat = new THREE.MeshStandardMaterial({
      color: "#020617",
      emissive: "#0ea5e9",
      emissiveIntensity: 0.25,
      roughness: 0.8,
      metalness: 0.3,
    });
    const globe = new THREE.Mesh(globeGeom, globeMat);
    scene.add(globe);

    const atmoGeom = new THREE.SphereGeometry(radius * 1.05, 64, 64);
    const atmoMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color("#38bdf8"),
      transparent: true,
      opacity: 0.35,
      side: THREE.BackSide,
    });
    const atmosphere = new THREE.Mesh(atmoGeom, atmoMat);
    scene.add(atmosphere);

    const dirLight = new THREE.DirectionalLight("#e5e7eb", 1.2);
    dirLight.position.set(4, 3, 5);
    scene.add(dirLight);
    const ambient = new THREE.AmbientLight("#0f172a", 0.7);
    scene.add(ambient);

    const markerGeom = new THREE.SphereGeometry(0.045, 16, 16);
    const markerMat = new THREE.MeshBasicMaterial({ color: "#3b82f6" });
    const marker = new THREE.Mesh(markerGeom, markerMat);

    const latRad = (HK_LAT * Math.PI) / 180;
    const lonRad = (HK_LON * Math.PI) / 180;
    const markerRadius = radius * 1.01;
    marker.position.set(
      markerRadius * Math.cos(latRad) * Math.cos(lonRad),
      markerRadius * Math.sin(latRad),
      markerRadius * Math.cos(latRad) * Math.sin(lonRad)
    );
    globe.add(marker);

    let isDragging = false;
    let prevX = 0;
    let prevY = 0;
    let rotationY = 0;
    let rotationX = 0.25;

    const onPointerDown = (e) => {
      isDragging = true;
      prevX = e.clientX;
      prevY = e.clientY;
    };

    const onPointerUp = () => {
      isDragging = false;
    };

    const onPointerMove = (e) => {
      if (!isDragging) return;
      const dx = e.clientX - prevX;
      const dy = e.clientY - prevY;
      prevX = e.clientX;
      prevY = e.clientY;

      rotationY += dx * 0.005;
      rotationX += dy * 0.005;
      rotationX = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, rotationX));
    };

    container.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointerup", onPointerUp);
    window.addEventListener("pointermove", onPointerMove);

    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener("resize", handleResize);

    const animate = () => {
      frameRef.current = requestAnimationFrame(animate);

      rotationY += 0.002;

      globe.rotation.y = rotationY;
      globe.rotation.x = rotationX;
      atmosphere.rotation.copy(globe.rotation);

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(frameRef.current);
      window.removeEventListener("resize", handleResize);
      container.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("pointermove", onPointerMove);
      container.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, []);

  return (
    <div className="relative w-full max-w-[420px] aspect-square mx-auto glass-panel overflow-hidden">
      <div ref={containerRef} className="w-full h-full" />
      <motion.div
        className="pointer-events-none absolute bottom-4 left-4 flex items-center gap-2"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.4 }}
      >
        <motion.span
          className="h-2 w-2 rounded-full bg-blue-400 shadow-[0_0_18px_rgba(59,130,246,0.9)]"
          animate={{ scale: [1, 1.8, 1], opacity: [1, 0.1, 1] }}
          transition={{ repeat: Infinity, duration: 1.6 }}
        />
        <span className="rounded-full bg-slate-900/80 px-3 py-1 text-xs font-mono text-slate-200 border border-slate-700/70">
          📍 Hong Kong
        </span>
      </motion.div>
    </div>
  );
}

