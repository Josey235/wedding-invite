import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Invite from "./pages/Invite";
import Petals from "./components/Petals";

function App() {
  return (
    <div className="relative min-h-screen bg-[#fdf6f6] overflow-hidden">

      {/* 🌸 Background Animation */}
      <Petals />

      {/* 🌐 Main Content */}
      <div className="relative z-20">
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/invite/:slug" element={<Invite />} />
        </Routes>
      </div>

    </div>
  );
}

export default App;