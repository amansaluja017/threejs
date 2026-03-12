import React from 'react'
import { useGLTF, OrbitControls } from '@react-three/drei'
import { useThree } from '@react-three/fiber';

function Dog() {

    const {scene} = useGLTF("/models/dog.drc.glb");

    useThree(({camera}) => {
        console.log(camera.position);
        camera.position.z = 0.7;
    })
  return (
    <>
        <primitive object={scene} position={[0.25, -0.55, 0]} rotation={[0, Math.PI/5, 0]} />
        <directionalLight position={[0, 5, 5]} intensity={10} color={0xFFFFFF} />
        <OrbitControls />
    </>
  )
}

export default Dog;