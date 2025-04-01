const userModel = require("../models/userModel");
const Question = require('../models/question');
const mongoose = require("mongoose");


// Create a new question
const createQuestion = async (req, res) => {
    try {
        const { problemStatement, answers, correctAnswer, questionType, difficulty, subject } = req.body;

        // Validate the input
        if (!problemStatement || !answers || !Array.isArray(answers) || answers.length === 0 || 
            !correctAnswer || !questionType || !difficulty || !subject) {
            return res.status(400).json({ message: "All fields are required and answers must be an array." });
        }

        // Check if the correct answer is in the answers array
        if (!answers.includes(correctAnswer)) {
            return res.status(400).json({ message: "Correct answer must be one of the provided answers." });
        }

        // Create a new question instance
        const newQuestion = new Question({
            problemStatement,
            answers,
            correctAnswer,
            questionType,
            difficulty,  
            subject      
        });

        // Save the question to the database
        await newQuestion.save();

        // Respond with the created question
        return res.status(201).json(newQuestion);
    } catch (error) {
        console.error("Error creating question:", error);
        return res.status(500).json({ message: "Internal server error." });
    }
};


// Get all questions
const getAllQuestions = async (req, res) => {
    try {
        const questions = await Question.find();
        return res.status(200).json(questions);
    } catch (error) {
        console.error("Error retrieving questions:", error);
        return res.status(500).json({ message: "Internal server error." });
    }
};

// Get a question by ID
const getQuestionById = async (req, res) => {
    try {
        const { id } = req.params;
        const question = await Question.findById(id);

        if (!question) {
            return res.status(404).json({ message: "Question not found." });
        }

        return res.status(200).json(question);
    } catch (error) {
        console.error("Error retrieving question:", error);
        return res.status(500).json({ message: "Internal server error." });
    }
};

// Edit (update) a question by ID
const editQuestionById = async (req, res) => {
    try {
        const { id } = req.params;
        const { problemStatement, answers, correctAnswer, questionType } = req.body;

        // Validate the input
        if (!problemStatement || !answers || !Array.isArray(answers) || answers.length === 0 || !correctAnswer || !questionType) {
            return res.status(400).json({ message: "All fields are required and answers must be an array." });
        }

        // Check if the correct answer is in the answers array
        if (!answers.includes(correctAnswer)) {
            return res.status(400).json({ message: "Correct answer must be one of the provided answers." });
        }

        // Update the question
        const updatedQuestion = await Question.findByIdAndUpdate(
            id,
            { problemStatement, answers, correctAnswer, questionType },
            { new: true, runValidators: true } // Return the updated document and run validators
        );

        if (!updatedQuestion) {
            return res.status(404).json({ message: "Question not found." });
        }

        return res.status(200).json(updatedQuestion);
    } catch (error) {
        console.error("Error updating question:", error);
        return res.status(500).json({ message: "Internal server error." });
    }
};

module.exports = {
    createQuestion,
    getAllQuestions,
    getQuestionById,
    editQuestionById
};
