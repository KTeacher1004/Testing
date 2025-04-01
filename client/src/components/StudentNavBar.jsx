import { Link } from "react-router-dom";
import { useState } from "react";
import logo from "../assets/logo.png";
import { FaUserCircle } from "react-icons/fa";

const StudentNavBar = () => {
  const [showCategories, setShowCategories] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:8000/logout", {
        method: "GET",
        credentials: "include", // Ensures session cookies are sent
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        localStorage.removeItem("user");
        window.location.href = "/login";
      } else {
        const errorMsg = await response.text();
        console.error("Logout failed:", errorMsg);
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <nav className="bg-white shadow-md p-4 flex items-center justify-between">
      {/* Logo (Clickable, Redirects to Home) */}
      <Link to="/" className="flex items-center">
        <img src={logo} alt="Eacademy Logo" className="h-12" />
      </Link>

      {/* Search Bar */}
      <div className="flex-grow max-w-xl mx-4">
        <input
          type="text"
          placeholder="Search..."
          className="border px-4 py-2 rounded-md w-full focus:outline-none"
        />
      </div>

      {/* Navigation Links */}
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
        
        <Link to="/course-history" className="hover:underline">Course History</Link>

        {/* User Profile Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="focus:outline-none"
          >
            <FaUserCircle className="text-3xl" />
          </button>
          {showProfileMenu && (
            <div className="absolute right-0 mt-2 bg-white shadow-md rounded-md p-2 w-40">
              <Link to="/profile" className="block px-4 py-2 hover:bg-gray-100">My Profile</Link>
              <button 
                className="block w-full text-left px-4 py-2 hover:bg-gray-100" 
                onClick={handleLogout}
              >Logout</button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default StudentNavBar;