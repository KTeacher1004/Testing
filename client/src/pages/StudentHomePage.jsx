import StudentNavBar from "../components/StudentNavBar";
import Footer from "../components/Footer";

const StudentLandingPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <StudentNavBar />

      {/* Category Section */}
      <div className="p-10">
        <h2 className="text-2xl font-semibold text-center mb-6">Categories</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {["Information Technology", "Math", "History", "English"].map((category, index) => (
            <div key={index} className="bg-gray-200 p-6 rounded-lg text-center shadow-md">
              <p className="text-lg font-bold">{category}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default StudentLandingPage;