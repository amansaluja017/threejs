import "./App.css";
import { Canvas } from "@react-three/fiber";
import Dog from "./component/Dog";

function App() {
  return (
    <>
      <main>
        <Canvas style={
        {
          backgroundImage: "url('/background-l.png')",
          backgroundSize: "cover",
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
        }
      }>
        <Dog />
      </Canvas>
      <section id="section-1"></section>
      <section id="section-2"></section>
      <section id="section-3"></section>
      </main>
    </>
  );
}

export default App;