import { Link } from "react-router-dom";
import NavBar from "../NavBar";
import Footer from "../Footer";

const GuestLandingPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <NavBar />

      {/* Banner */}
      <div className="bg-sky-500 text-white text-center py-20 text-3xl font-bold">
        Welcome to Ecademy
      </div>

      {/* Trial Quizzes */}
      <div className="p-10">
        <h2 className="text-2xl font-semibold text-center mb-6">Learn from the best</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {["Information Technology", "Math", "English", "Business"].map((quiz, index) => (
            <div key={index} className="bg-gray-200 p-6 rounded-lg text-center shadow-md">
              <p className="text-lg font-bold">{quiz}</p>
              <button className="bg-black text-white px-4 py-2 mt-4 rounded-md">Trial</button>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-gray-100 py-16 px-6 text-center">
        <h2 className="text-3xl font-bold mb-4">About Us</h2>
        <p className="max-w-3xl mx-auto text-lg text-gray-700">
          At Ecademy, we are dedicated to providing high-quality educational resources to learners worldwide.
          Our mission is to make education accessible and engaging through interactive quizzes and expert-driven content.
          Join us to enhance your knowledge and skills in a fun and effective way.
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {["Project Manager", "Front-end Developer", "Back-end Developer", "Database Developer"].map((quiz, index) => (
            <div key={index} className="bg-gray-200 p-6 rounded-lg text-center shadow-md">
              <p className="text-lg font-bold">{quiz}</p>
            </div>
          ))}
          </div>
        </p>
      </div>
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default GuestLandingPage;
