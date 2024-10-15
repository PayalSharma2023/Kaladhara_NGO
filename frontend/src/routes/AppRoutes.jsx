// src/routes/AppRoutes.jsx
import { Routes, Route } from "react-router-dom";
// Pages
import Home from "../pages/Home";
import Dashboard from "../pages/Dashboard";
import Projects from "../pages/Projects";
import Members from "../pages/Members";
import Blog from "../pages/Blog";
import Donations from "../pages/Donations";
import Settings from "../pages/Settings";
import Help from "../pages/Help";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/" element={<Dashboard />} />
      <Route path="/projects" element={<Projects />} />
      <Route path="/members" element={<Members />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/donations" element={<Donations />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/help" element={<Help />} />
    </Routes>
  );
};

export default AppRoutes;
