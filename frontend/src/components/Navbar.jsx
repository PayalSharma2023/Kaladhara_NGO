import { useAuthContext } from "../hooks/useAuthContext";
import { useLogout } from "../hooks/useLogout";
import {Link} from "react-router-dom"

const Navbar = () => {
  const {logout} = useLogout();
  const {user} = useAuthContext();

  const handleClick = () => {
    logout();
  };

    return (
      <div className="w-full bg-gray-800 text-white p-4 flex justify-between items-center">
        <h1 className="text-lg invisible">Admin</h1>
        <nav>
          {user && (
            <div>
              <span className="p-2 m-2 font-lg">{user.role}</span>
              <button onClick={handleClick} className="p-2 mr-4 hover:border border-white rounded">Log out</button>
            </div>
          )}
          {!user && (
            <div className="">
              <Link to="/login" className="hover:border p-2 mr-2 rounded">Login</Link>
              <Link to="/signup" className="hover:border p-2 rounded">Signup</Link>
            </div>
          )}
        </nav>
      </div>
    );
  };
  
  export default Navbar;
  