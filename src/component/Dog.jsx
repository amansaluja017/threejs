import {
  useGLTF,
  OrbitControls,
  useTexture,
  useAnimations,
} from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP);
gsap.registerPlugin(ScrollTrigger);

function Dog() {
  const model = useGLTF("/models/dog.drc.glb");
  const dogModel = useRef(model);

  useThree(({ camera, gl }) => {
    camera.position.z = 0.7;
    gl.toneMapping = THREE.ReinhardToneMapping;
    gl.outputColorSpace = THREE.SRGBColorSpace;
  });

  const [normaMap, sampleMatCap] = useTexture([
    "/dog_normals.jpg",
    "/matcap/mat-2.png",
  ]).map((texture) => {
    texture.flipY = false;
    texture.colorSpace = THREE.SRGBColorSpace;
    return texture;
  });

  const [branchNormalMap, branchMap] = useTexture([
    "/branches_normals.jpeg",
    "/branches_diffuse.jpeg",
  ]).map((texture) => {
    texture.colorSpace = THREE.SRGBColorSpace;
    return texture;
  });

  const material = new THREE.MeshMatcapMaterial({
    normalMap: normaMap,
    matcap: sampleMatCap,
  });

  const branchMaterial = new THREE.MeshMatcapMaterial({
    normalMap: branchNormalMap,
    map: branchMap,
  });

  model.scene.traverse((child) => {
    if (child.name.includes("DOG")) {
      child.material = material;
    } else {
      child.material = branchMaterial;
    }
  });

  const { actions } = useAnimations(model.animations, model.scene);

  useEffect(() => {
    if (actions) {
      actions["Take 001"].play();
    }
  }, [actions]);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#section-1",
        endTrigger: "#section-3",
        start: "top top",
        end: "bottom bottom",
        markers: true,
        scrub: true
      }
    })

    tl.to(dogModel.current.scene.position, {
      z: "-=0.75",
      y: "+=0.1",
    })
    .to(dogModel.current.scene.rotation, {
      x: `+=${Math.PI / 15}`
    })
    .to(dogModel.current.scene.rotation, {
      y: `-=${Math.PI}`
    }, "third")
    .to(dogModel.current.scene.position, {
      x: "-=0.5",
      z: "+=0.6",
      y: "-=0.05",
    }, "third")
  }, []);

  return (
    <>
      <primitive
        object={model.scene}
        position={[0.25, -0.55, 0]}
        rotation={[0, Math.PI / 5, 0]}
      />
    </>
  );
}

export default Dog;