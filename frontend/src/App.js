import { BrowserRouter } from "react-router-dom";
import './index.css'

// pages and components
import Navbar from "./components/Navbar";
import Sidebar, { SidebarItem } from "./components/Sidebar";
import {
  LifeBuoy,
  HandHeart,
  NotebookPen,
  UserCircle,
  BarChart3,
  LayoutDashboard,
  Settings,
} from "lucide-react"
import AppRoutes from "./routes/AppRoutes";
import { useAuthContext } from "./hooks/useAuthContext";

import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

function App() {
  const {user} = useAuthContext()
  return (
    <div className="App">
      <BrowserRouter>
      <ToastContainer
                    position="bottom-right"
                    autoClose={3000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    theme="dark"
                />
        <div className="flex h-screen">
          {user && (<Sidebar>
            <SidebarItem
            icon={<LayoutDashboard size={20}/>}
            text="Dashboard"
            to="/"
            alert={true} // Example: Dashboard has an alert
            />
            <SidebarItem icon={<BarChart3 size={20}/>} text="Projects" to="/projects" alert={false}/>
            <SidebarItem icon={<UserCircle size={20}/>} text="Members" to="/members" alert={true}/>
            <SidebarItem icon={<NotebookPen size={20}/>} text="Blog" to="/blog" alert={false}/>
            <SidebarItem icon={<HandHeart  size={20}/>} text="Donations"to="/donations" alert={false}/>
            <hr className="my-3"/>
            <SidebarItem icon={<Settings size={20}/>} text="Settings" to="/settings" alert={false}/>
            <SidebarItem icon={<LifeBuoy size={20}/>} text="Help"to="/help" alert={false}/>
          </Sidebar>)}
          <div  className="flex flex-col flex-grow">
            <Navbar />
            <div className="pages p-6 flex-grow bg-gray-100 text-black overflow-auto">
             <AppRoutes/>
            </div>
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
