import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Invite from "./pages/Invite";

// 🔥 TEMP DEFAULT EVENT
const DEFAULT_EVENT_ID = "02cf8c70-a103-4759-8395-88267b880426";

function App() {
  return (
    <div className="min-h-screen bg-[#fdf6f6]">

      <Routes>

        {/* Redirect */}
        <Route
          path="/"
          element={<Navigate to={`/dashboard/${DEFAULT_EVENT_ID}`} />}
        />

        {/* Dashboard */}
        <Route path="/dashboard/:eventId" element={<Dashboard />} />

        {/* 🔥 ADD THIS (COMMON INVITE ROUTE) */}
        <Route path="/invite/event/:eventId" element={<Invite />} />

        {/* Invite */}
        <Route path="/invite/:slug" element={<Invite />} />

      </Routes>

    </div>
  );
}

export default App;