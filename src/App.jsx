import { useState } from "react";
import "./App.css";
import Sidebard from "./components/layout/Sidebard";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="flex flex-row h-full">
      <Sidebard />
    </div>
  );
}

export default App;
