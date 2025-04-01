import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./LoginSignup.css";

const Register = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("Student"); // Default role is student
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    try {
      const response = await fetch("http://localhost:8000/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, username, email, password, role })
      });
      const rawText = await response.text(); // Read raw response text
      console.log("Raw response:", rawText);
      
      if (!response.ok) {
        let errorData;
        try {
          errorData = JSON.parse(rawText);
        } catch {
          throw new Error("Invalid JSON response from server");
        }
        throw new Error(errorData?.error || "Registration failed");
      }
      
      const data = JSON.parse(rawText);
      console.log("Registration successful", data);
      alert("Registered successfully! Redirecting to login...");
      navigate("/auth/login");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-12 rounded-lg shadow-xl w-full max-w-xl">
        <h2 className="text-3xl font-bold text-center mb-6">Register</h2>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-5">
          <input 
            type="text" 
            placeholder="Full Name" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            required 
            className="px-5 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
          />
          <input 
            type="text" 
            placeholder="Username" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            required 
            className="px-5 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
          />
          <input 
            type="email" 
            placeholder="Email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
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
          <input 
            type="password" 
            placeholder="Confirm Password" 
            value={confirmPassword} 
            onChange={(e) => setConfirmPassword(e.target.value)} 
            required 
            className="px-5 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
          />
          <div className="flex justify-center space-x-4">
            <button 
              type="button" 
              className={`px-5 py-2 rounded-md text-white transition duration-300 transform ${role === "Student" ? "bg-blue-600 scale-110 shadow-lg" : "bg-gray-400 hover:bg-blue-500 hover:scale-105"}`}
              onClick={() => setRole("Student")}
            >
              Student
            </button>
            <button 
              type="button" 
              className={`px-5 py-2 rounded-md text-white transition duration-300 transform ${role === "Teacher" ? "bg-blue-600 scale-110 shadow-lg" : "bg-gray-400 hover:bg-blue-500 hover:scale-105"}`}
              onClick={() => setRole("Teacher")}
            >
              Teacher
            </button>
          </div>
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          <button 
            type="submit" 
            className="bg-green-600 text-white py-3 rounded-md hover:bg-green-700 transition duration-300 text-lg font-semibold"
          >
            Register
          </button>
        </form>
        <div className="text-center mt-4">
          <span className="text-gray-600">Already have an account?</span> 
          <Link to="/auth/login" className="text-blue-600 hover:underline ml-1">Login</Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
