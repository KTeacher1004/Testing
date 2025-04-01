const express = require("express");
const {
    createQuestion,
    getAllQuestions,
    getQuestionById,
    editQuestionById
} = require("../controllers/testController"); // Đảm bảo đường dẫn đúng

const router = express.Router();

// Route to create a new question (POST)
router.post("/question", createQuestion);

// Route to get all questions (GET)
router.get("/questions", getAllQuestions);

// Route to get a question by ID (GET)
router.get("/question/:id", getQuestionById);

// Route to update a question by ID (PUT)
router.put("/question/:id", editQuestionById);

module.exports = router;
