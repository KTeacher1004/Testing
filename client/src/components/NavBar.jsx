import { Link } from "react-router-dom";
import { useState } from "react";
import logo from "../assets/logo.png"; // Make sure the logo is placed in 'src/assets/logo.png'

const NavBar = () => {
  const [showCategories, setShowCategories] = useState(false);

  return (
    <nav className="bg-white shadow-md p-4 flex items-center justify-between">
      {/* Logo (Clickable, Redirects to Home) */}
      <Link to="/" className="flex items-center">
        <img src={logo} alt="Eacademy Logo" className="h-12" />
      </Link>

      {/* Search Bar (Centered and proportional) */}
      <div className="flex-grow max-w-xl mx-4">
        <input
          type="text"
          placeholder="Search..."
          className="border px-4 py-2 rounded-md w-full focus:outline-none"
        />
      </div>

      {/* Navigation Links (Pushed to Right) */}
      <div className="flex space-x-6 items-center">
        <div className="relative">
          <button
            onMouseEnter={() => setShowCategories(true)}
            onMouseLeave={() => setShowCategories(false)}
            className="hover:underline"
          >
            Category
          </button>
          {showCategories && (
            <div
              onMouseEnter={() => setShowCategories(true)}
              onMouseLeave={() => setShowCategories(false)}
              className="absolute top-full left-0 bg-white shadow-md rounded-md p-2 w-48"
            >
              <Link to="/category/it" className="block px-4 py-2 hover:bg-gray-100">Information Technology</Link>
              <Link to="/category/math" className="block px-4 py-2 hover:bg-gray-100">Math</Link>
              <Link to="/category/english" className="block px-4 py-2 hover:bg-gray-100">English</Link>
              <Link to="/category/history" className="block px-4 py-2 hover:bg-gray-100">History</Link>
            </div>
          )}
        </div>
        
        <Link to="/about" className="hover:underline whitespace-nowrap">About Us</Link>
        <Link to="/auth/login" className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600">Login</Link>
      </div>
    </nav>
  );
};

export default NavBar;
