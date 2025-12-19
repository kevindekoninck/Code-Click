import { Routes, Route } from "react-router-dom";
import Home from "./pages/LandinPage";
import Header from "./components/Header";
import PrincipalePage from "./pages/PrincipalePage";

function App() {
  return (
    <div className="bg-gradient-to-br from-[#3b2424] to-[#100a0a]">
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/principale/:etna_id" element={<PrincipalePage />} />
        <Route path="*" element={<h1>404</h1>} />
      </Routes>
    </div>
  );
}

export default App;
