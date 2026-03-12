import "./App.css";
import { Canvas } from "@react-three/fiber";
import Dog from "./component/Dog";

function App() {
  return (
    <>
      <Canvas>
        <Dog />
      </Canvas>
    </>
  );
}

export default App;
