import Canvas from "./components/Canvas";
import Settings from "./components/Settings";
import Toolbar from "./components/Toolbar";
import "./styles/app.scss";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path="/:id"
            element={
              <>
                <Toolbar />
                <Settings />
                <Canvas />
              </>
            }
          ></Route>
          <Route
            path="*"
            element={<Navigate replace to={`f${(Date.now()).toString(16)}`} />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
