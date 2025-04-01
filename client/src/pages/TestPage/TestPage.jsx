import React, { useState, useEffect } from "react";
import questionsData from "../../data/question.json";

const getRandomQuestions = (questions, count) => {
  const shuffled = [...questions].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

const TestPage = ({ questionNum, easy, normal, hard }) => {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  useEffect(() => {
    if (easy + normal + hard !== questionNum) return;
    const easyQs = getRandomQuestions(questionsData.multipleChoice.easy, easy);
    const normalQs = getRandomQuestions(questionsData.multipleChoice.normal, normal);
    const hardQs = getRandomQuestions(questionsData.multipleChoice.hard, hard);
    setQuestions([...easyQs, ...normalQs, ...hardQs]);
  }, [questionNum, easy, normal, hard]);

  if (easy + normal + hard !== questionNum) {
    return <p className="text-red-500">Error: Total questions do not match.</p>;
  }

  if (questions.length === 0) return <p>Loading questions...</p>;

  const currentQuestion = questions[currentIndex];

  const handleAnswerClick = (option) => {
    setSelectedAnswer(option);
    setTimeout(() => {
      if (currentIndex < questions.length - 1) {
        setSelectedAnswer(null);
        setCurrentIndex(currentIndex + 1);
      } else {
        alert("Test completed!");
      }
    }, 1500);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h2 className="text-2xl font-bold mb-4 text-center">{currentQuestion.question}</h2>
      <div className="grid grid-cols-2 gap-4 w-full max-w-md">
        {currentQuestion.options.map((option, index) => {
          const isCorrect = option === currentQuestion.answer;
          let bgColor = ["bg-red-500", "bg-blue-500", "bg-green-500", "bg-purple-500"][index];
          if (selectedAnswer) {
            bgColor = isCorrect ? bgColor : "bg-gray-400";
          }
          return (
            <button
              key={option}
              className={`p-4 text-white font-semibold rounded-lg ${bgColor} transition-all duration-300`}
              onClick={() => handleAnswerClick(option)}
              disabled={selectedAnswer !== null}
            >
              {option}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default TestPage;
