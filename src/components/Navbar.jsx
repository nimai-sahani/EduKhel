import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-gray-900 text-white px-6 py-4 shadow-lg flex justify-between items-center">
      {/* Logo Section */}
      <div className="flex items-center space-x-2">
        <img 
          src="/src/assets/applogo2.png"  // ✅ Place logo inside src/assets or public folder
          alt="EduKhel Logo" 
          className="w-10 h-10"
        />
        <span className="text-2xl font-bold tracking-wide">EduKhel</span>
      </div>

      {/* Navigation Links */}
      <div className="hidden md:flex space-x-6 text-lg font-medium">
        <Link to="/" className="hover:text-yellow-400 transition">Home</Link>
        <Link to="/dashboard" className="hover:text-yellow-400 transition">Dashboard</Link>
        <Link to="/login" className="hover:text-yellow-400 transition">Login</Link>
        <Link to="/signup" className="hover:text-yellow-400 transition">Signup</Link>
      </div>

      {/* Mobile Menu (hamburger) */}
      <div className="md:hidden">
        <button className="text-white focus:outline-none">
          ☰
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
