import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./Components/Home";
import { Provider } from "./context/StoryContext";

function App() {
  return (
    <Provider>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </Provider>
  );
}

export default App;
