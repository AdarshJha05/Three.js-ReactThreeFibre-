import React, { useLayoutEffect, useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useScroll } from "@react-three/drei";
import gsap from "gsap";

export const FLOOR_HEIGHT = 2.3;
export const NB_FLOORS = 3;

export function Office(props) {
  const { nodes, materials } = useGLTF("./models/WawaOffice.glb");
  const ref = useRef(); // Main group ref
  const t1 = useRef(null); // GSAP timeline ref
  const libraryRef = useRef(); // Library ref
  const atticRef = useRef(); // Attic ref

  const scroll = useScroll();

  // Animation frame handler to synchronize with scroll
  useFrame(() => {
    if (t1.current) {
      t1.current.seek(scroll.offset * t1.current.duration());
    }
  });

  useLayoutEffect(() => {
    if (!ref.current) return; // Ensure the ref is valid before animating

    // Initialize the GSAP timeline
    t1.current = gsap.timeline();

    // Main group vertical movement based on floor height
    t1.current.to(
      ref.current.position,
      {
        duration: 2,
        y: -FLOOR_HEIGHT * (NB_FLOORS - 1), // Move down by 2 floors
      },
      0 // Start at time 0 of the timeline
    );

    // LIBRARY FLOOR ANIMATION
    t1.current.from(
      libraryRef.current.position,
      {
        duration: 0.5,
        x: -2,
      },
      0.5
    );
    t1.current.from(
      libraryRef.current.rotation,
      {
        duration: 0.5,
        y: -Math.PI / 2,
      },
      0
    );

    // ATTIC FLOOR ANIMATION
    t1.current.from(
      atticRef.current.position,
      {
        duration: 1.5,
        y: 2,
      },
      0
    );
    t1.current.from(
      atticRef.current.rotation,
      {
        duration: 0.5,
        y: Math.PI / 2,
      },
      1
    );
    t1.current.from(
      atticRef.current.position,
      {
        duration: 0.5,
        z: -2,
      },
      1.5
    );
  }, []);

  return (
    <group ref={ref} {...props} dispose={null}>
      <mesh geometry={nodes["01_office"].geometry} material={materials["01"]} />

      {/* Library positioned at Floor 2 */}
      <group ref={libraryRef} position={[0, FLOOR_HEIGHT, -2.23]}>
        <mesh geometry={nodes["02_library"].geometry} material={materials["02"]} />
      </group>

      {/* Attic positioned at Floor 3 */}
      <group ref={atticRef} position={[0, FLOOR_HEIGHT * 2, -2.2]}>
        <mesh geometry={nodes["03_attic"].geometry} material={materials["03"]} />
      </group>
    </group>
  );
}

// Preload the GLTF model
useGLTF.preload("./models/WawaOffice.glb");
