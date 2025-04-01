const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    problemStatement: { type: String, required: true },
    answers: [{ type: String, required: true }], 
    correctAnswer: { type: String, required: true },
    questionType: { 
        type: String, 
        enum: ["MultipleChoice", "TrueFalse"], 
        required: true  
    },
    difficulty: { 
        type: String, 
        enum: ["Easy", "Normal", "Hard"], 
        required: true  
    },
    subject: { type: String, required: true }
    
}, { timestamps: true });

const Question = mongoose.model("Question", questionSchema);
module.exports = Question;
