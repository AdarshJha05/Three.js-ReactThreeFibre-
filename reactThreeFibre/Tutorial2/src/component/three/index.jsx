import { angleToRadians } from "../../utils/angle";

export default function Three() {
  return (
    <>
    <mesh>
        <sphereGeometry args={[1, 32,32]} />
    </mesh>
      <ambientLight args={["#ffffff", 1]} />
    </>
  );
}
