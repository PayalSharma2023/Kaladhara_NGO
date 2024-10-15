// import logo from "../assets/logo.png";
import { ChevronFirst, ChevronLast, MoreVertical } from "lucide-react";
import { createContext, useContext, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import PropTypes from "prop-types";

const SidebarContext = createContext();

export default function Sidebar({ children }) {
  const [expanded, setExpanded] = useState(true);

  return (
    <aside className="h-screen">
      <nav className="h-full flex flex-col bg-white border-r shadow-sm">
        <div className="p-4 pb-2 flex justify-between items-center">
          <div
            className={`
            overflow-hidden transition-all font-medium text-lg rounded  bg-gray-800 text-white
             ${expanded ? "w-52 p-2 pl-6" : "w-0"}`}
          >
            Kaladhara Group
          </div>

          <button
            onClick={() => setExpanded((curr) => !curr)}
            className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100"
          >
            {expanded ? <ChevronFirst /> : <ChevronLast />}
          </button>
        </div>

        <SidebarContext.Provider value={{ expanded }}>
          <ul className="flex-1 px-3">{children}</ul>
        </SidebarContext.Provider>

        <div className="border-t flex p-3">
          <img
            src="https://ui-avatars.com/api/?background=c7d2fe&color=3730a3&bold=true"
            alt=""
            className="w-10 h-10 rounded-md"
          />
          <div
            className={`
            flex justify-between items-center 
            overflow-hidden transition-all 
            ${expanded ? "w-52 ml-3" : "w-0"}
            `}
          >
            <div className="leading-4">
              <h4 className="font-semibold">John Doe</h4>
              <span className="text-xs text-gray-600">john@gmail.com</span>
            </div>
            <MoreVertical size={20} />
          </div>
        </div>
      </nav>
    </aside>
    // <div className="w-64 h-screen bg-gray-800 text-white p-4 flex flex-col">
    //   <h1 className="text-2xl font-bold mb-8">Admin Panel</h1>
    //   <nav>
    //     <ul className="space-y-6">
    //       <li>
    //         <Link to="/" className="hover:text-gray-300">Dashboard</Link>
    //       </li>
    //       <li>
    //         <Link to="/users" className="hover:text-gray-300">Users</Link>
    //       </li>
    //       <li>
    //         <Link to="/projects" className="hover:text-gray-300">Projects</Link>
    //       </li>
    //       <li>
    //         <Link to="/events" className="hover:text-gray-300">Events</Link>
    //       </li>
    //       <li>
    //         <Link to="/blogs" className="hover:text-gray-300">Blogs</Link>
    //       </li>
    //     </ul>
    //   </nav>
    // </div>
  );
}

Sidebar.propTypes = {
  children: PropTypes.node.isRequired,
};

export function SidebarItem({ icon, text, active, alert, to }) {
  const { expanded } = useContext(SidebarContext);
  const location = useLocation();

  //Determine if the current route matches the 'to' prop
  const isActive = location.pathname === to;

  return (
    <li
      className={`
    relative `}
    >
      <Link
        to={to}
        className={`
        flex items-center py-2 px-3 my-1 
    font-medium rounded-md cursor-pointer 
    transition-colors group
    ${
      isActive
        ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800"
        : "hover:bg-indigo-50 text-gray-600"
    }`}
      aria-current = {isActive ? "page" : undefined}
      >
        {icon}

        <span
          className={`overflow-hidden transition-all ${
            expanded ? "w-52 ml-3" : "w-0"
          }`}
        >
          {text}
        </span>

        {alert && (
          <div
            className={`absolute right-2 w-2 h-2 rounded bg-indigo-400
        ${expanded ? "" : "top-2"}`}
          />
        )}

        {!expanded && (
          <div
            className={`
              absolute left-full rounded-md px-2 py-1 ml-6
              bg-indigo-100 text-indigo-800 text-sm
              invisible opacity-20 -translate-x-3 transition-all
              group-hover:visible group-hover:opacity-100 group-hover:translate-x-0
              `}
          >
            {text}
          </div>
        )}
      </Link>
    </li>
  );
}

SidebarItem.propTypes = {
  icon: PropTypes.element.isRequired,
  text: PropTypes.string.isRequired,
  alert: PropTypes.bool,
  to: PropTypes.string.isRequired,
};

SidebarItem.defaultProps = {
  alert: false,
};