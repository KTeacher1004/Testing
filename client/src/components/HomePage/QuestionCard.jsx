import React from "react";
import { Link } from "react-router-dom";

const QuestionCard = ({ subject }) => {
  const subjectColors = {
    Math: "bg-red-500",
    History: "bg-green-500",
    Geography: "bg-blue-800",
    IT: "bg-purple-500",
  };

  return (
    <Link to={`/test?subject=${subject}`} className="block">
      <div className={`p-4 text-white text-center text-lg font-semibold rounded-lg shadow-md ${subjectColors[subject] || "bg-gray-300"}`}>
        {subject}
      </div>
    </Link>
  );
};

export default QuestionCard;
