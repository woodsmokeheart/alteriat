import "./App.module.css";
import { TimeBasedImage } from "./components/TimeBasedImage/TimeBasedImage";
import { BottomBar } from "./components/BottomBar/BottomBar";

function App() {
  return (
    <div className="App">
      <TimeBasedImage />
      <BottomBar />
    </div>
  );
}

export default App;
