import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"; // Import axios
import "./LoginSignup.css";

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    
    try {
      const { data } = await axios.post(
        "http://localhost:8000/auth/login",
        { username, password },
        { withCredentials: true } 
      );

      console.log("Login successful", data);

      onLogin(data);
      setTimeout(() => {
        if (data.user?.role === "Student") {
          navigate("/student-home");
        } else if (data.user?.role === "Teacher") {
          navigate("/teacher-home");
        }
      }, 100);

    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="p-12 rounded-lg shadow-xl w-full max-w-xl">
        <h2 className="text-3xl font-bold text-center mb-6">Login</h2>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-5">
          <input 
            type="text" 
            placeholder="Username" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            required 
            className="px-5 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
          />
          <input 
            type="password" 
            placeholder="Password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
            className="px-5 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
          />
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          <button 
            type="submit" 
            className="bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition duration-300 text-lg font-semibold"
          >
            Login
          </button>
        </form>
        <div className="text-center mt-4">
          <Link to="/forgot-password" className="text-blue-600 hover:underline">Forgot password?</Link>
        </div>
        <div className="text-center mt-2">
          <span className="text-gray-600">Don't have an account?</span> 
          <Link to="/auth/register" className="text-blue-600 hover:underline ml-1">Register</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
