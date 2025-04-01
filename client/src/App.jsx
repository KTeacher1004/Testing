import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import GuestLandingPage from "./components/HomePage/GuestLandingPage.jsx";
import StudentLandingPage from "./pages/StudentHomePage.jsx";
import TeacherLandingPage from "./pages/TeacherHomePage.jsx";
import Login from "./components/LoginSignup/LogIn.jsx";
import Register from "./components/LoginSignup/Register.jsx";
import ForgotPassword from "./components/ForgotPassword/ForgotPassword.jsx";

const App = () => {
  const [user, setUser ] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
  const storedUser = localStorage.getItem("user");
  if (storedUser) {
    try {
      const parsedUser = JSON.parse(storedUser);
      if (parsedUser?.role) {
        setUser(parsedUser);
      } else {
        console.error("Stored user data is invalid:", parsedUser);
        localStorage.removeItem("user"); 
      }
    } catch (err) {
      console.error("Error parsing user data:", err);
      localStorage.removeItem("user");
    }
  }
  setIsLoading(false);
}, []);


  const handleLogin = (userData) => {
  if (userData?.user) {
    setUser(userData.user);
    localStorage.setItem("user", JSON.stringify(userData.user));
  } else {
    console.error("Login response does not contain user data:", userData);
  }
};


  
  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:8000/logout", {
        method: "POST",
        credentials: "include",
      });
      if (response.ok) {
        setUser (null);
        localStorage.removeItem("user");
        window.location.href = "/login";
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  console.log(user);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<GuestLandingPage />} />
        <Route path="/auth/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/auth/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        
        {/* Protected Routes */}
        <Route
          path="/student-home"
          element={user && user.role === "Student" ? <StudentLandingPage onLogout={handleLogout} /> : <Navigate to="/auth/login" replace />}
        />
        <Route
          path="/teacher-home"
          element={user && user.role === "Teacher" ? <TeacherLandingPage onLogout={handleLogout} /> : <Navigate to="/auth/login" replace />}
        />

      </Routes>
    </Router>
  );
};

export default App;