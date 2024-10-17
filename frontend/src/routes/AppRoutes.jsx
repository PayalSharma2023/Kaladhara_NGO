// src/routes/AppRoutes.jsx
import { Routes, Route, Navigate } from "react-router-dom";
// Pages
import Home from "../pages/Home";
import Dashboard from "../pages/Dashboard";
import Projects from "../pages/Projects";
import Members from "../pages/Members";
import Blog from "../pages/Blog";
import Donations from "../pages/Donations";
import Settings from "../pages/Settings";
import Help from "../pages/Help";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import { useAuthContext } from "../hooks/useAuthContext";

const AppRoutes = () => {
  const {user} = useAuthContext();
  return (
    <Routes>
      <Route path="/" element={user ? <Home/> : <Navigate to="/login"/>} />
      <Route path="/" element={user ? <Dashboard /> : <Navigate to="/login"/>} />
      <Route path="/projects" element={user ? <Projects /> : <Navigate to="/login"/>} />
      <Route path="/members" element={user ? <Members /> : <Navigate to="/login"/>} />
      <Route path="/blog" element={user ? <Blog /> : <Navigate to="/login"/>} />
      <Route path="/donations" element={user ? <Donations /> : <Navigate to="/login"/>} />
      <Route path="/settings" element={user ? <Settings /> : <Navigate to="/login"/>} />
      <Route path="/help" element={user ? <Help /> : <Navigate to="/login"/>} />
      <Route path="/login" element={!user ? <Login/> : <Navigate to="/"/>}/>
      <Route path="/signup" element={!user ? <Signup/> : <Navigate to="/"/>}/>
    </Routes>
  );
};

export default AppRoutes;
