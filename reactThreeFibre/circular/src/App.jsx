import { Canvas } from "@react-three/fiber";
import React from "react";
import "./style.css";
import { OrbitControls } from "@react-three/drei";
import Cyl from "./Cyl";
import { EffectComposer } from "@react-three/postprocessing";
import { Bloom, ToneMapping } from "@react-three/postprocessing";

const App = () => {
  return (
    <>
      <Canvas camera={{ fov: 30 }}>
        {/* <OrbitControls /> remove to add more component and use them */}
        <ambientLight />
        <Cyl />
        <EffectComposer>
          <Bloom
            mipmapBlur // Enables or disables mipmap blur.
            intensity={8.0} // The bloom intensity.
            luminanceThreshold={0} // luminance threshold. Raise this value to mask out darker elements in the scene.
            luminanceSmoothing={0} // smoothness of the luminance threshold. Range is [0, 1]
          />
          {/* <ToneMapping adaptive /> */}
        </EffectComposer>
      </Canvas>
      <div className="container h-full flex">
        <h1>Hello this is Adarsh..!</h1>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero, quam! Nemo eum voluptatem, aperiam illo sunt, qui harum impedit, voluptate enim autem sed error? Repellendus tenetur nobis eaque voluptate a?
        Dolores assumenda illo sed voluptates inventore labore doloribus cumque. Magnam autem esse illum quos, veniam aliquid quaerat numquam recusandae, obcaecati excepturi quam odio, rerum dicta at voluptatibus quis quod iusto?
        Est odit animi nobis esse temporibus corrupti delectus consequuntur molestiae optio qui voluptatum voluptatibus perferendis quis, et aut nemo distinctio tenetur cum dolorum vero ullam. Ex et optio non perferendis?
        Minus, maxime. Tempora laboriosam autem tempore cupiditate odit nobis repudiandae corporis laudantium assumenda architecto. Nobis debitis, blanditiis assumenda labore quibusdam consequatur aliquid eaque odit id sunt eum vitae, sint et!
        Eius reprehenderit ratione quia deleniti corporis nesciunt, quis ab ad inventore ipsum laborum ipsam quam qui fugit eveniet suscipit alias facere iusto, ipsa iure quas cupiditate excepturi? Nobis, consequuntur consequatur.</p>
      </div>
    </>
  );
};

export default App;
