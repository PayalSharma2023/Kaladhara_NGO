const Navbar = () => {
    return (
      <div className="w-full bg-gray-800 text-white p-4 flex justify-between items-center">
        <h1 className="text-lg">Admin Dashboard</h1>
        <div className="flex items-center">
          <p className="mr-4">Welcome, Admin</p>
          <button className="bg-red-600 px-2 py-2 rounded">Logout</button>
        </div>
      </div>
    );
  };
  
  export default Navbar;
  