const QuestionPack = require('../models/questionPack');
const Question = require('../models/question');

const createQuestionPack = async (req, res) => {
    try {
        const { name, teachername, subjects, role, packType } = req.body;

        if (!name || !teachername || !subjects || !packType) {
            return res.status(400).json({ message: "Thiếu thông tin bộ câu hỏi." });
        }

        const newPack = new QuestionPack({
            name,
            teachername,
            subjects,
            role,
            packType,
            numberOfQuestion: 0,
            questions: []
        });

        await newPack.save();
        return res.status(201).json(newPack);
    } catch (error) {
        console.error("Error creating question pack:", error);
        return res.status(500).json({ message: "Internal server error." });
    }
};


const addQuestionToPack = async (req, res) => {
    try {
        const { packId } = req.params;
        const { problemStatement, answers, correctAnswer, questionType, difficulty } = req.body;

        const pack = await QuestionPack.findById(packId);
        if (!pack) {
            return res.status(404).json({ message: "Cannot find question pack" });
        }

        // Tạo câu hỏi mới
        const newQuestion = new Question({
            problemStatement,
            answers,
            correctAnswer,
            questionType,
            difficulty,
            subject: pack.subjects  // Lấy môn học từ bộ câu hỏi
        });

        await newQuestion.save();

 
        pack.questions.push(newQuestion._id);
        pack.numberOfQuestion += 1;
        await pack.save();

        return res.status(201).json({ message: "Câu hỏi đã được thêm vào bộ đề.", question: newQuestion });
    } catch (error) {
        console.error("Error adding question:", error);
        return res.status(500).json({ message: "Internal server error." });
    }
};

const getQuestionPackById = async (req, res) => {
    try {
        const { packId } = req.params;
        const pack = await QuestionPack.findById(packId).populate('questions');

        if (!pack) {
            return res.status(404).json({ message: "Bộ câu hỏi không tồn tại." });
        }

        return res.status(200).json(pack);
    } catch (error) {
        console.error("Error retrieving question pack:", error);
        return res.status(500).json({ message: "Internal server error." });
    }
};


const editQuestionPack = async (req, res) => {
    try {
        const { packId } = req.params;
        const { name, subjects, packType } = req.body;

        const updatedPack = await QuestionPack.findByIdAndUpdate(
            packId,
            { name, subjects, packType },
            { new: true, runValidators: true }
        );

        if (!updatedPack) {
            return res.status(404).json({ message: "Bộ câu hỏi không tồn tại." });
        }

        return res.status(200).json(updatedPack);
    } catch (error) {
        console.error("Error updating question pack:", error);
        return res.status(500).json({ message: "Internal server error." });
    }
};

const deleteQuestionPack = async (req, res) => {
    try {
        const { packId } = req.params;
        const pack = await QuestionPack.findByIdAndDelete(packId);

        if (!pack) {
            return res.status(404).json({ message: "Bộ câu hỏi không tồn tại." });
        }

        return res.status(200).json({ message: "Bộ câu hỏi đã bị xóa." });
    } catch (error) {
        console.error("Error deleting question pack:", error);
        return res.status(500).json({ message: "Internal server error." });
    }
};

module.exports = {
    createQuestionPack,
    getQuestionPack,
    editQuestionPack,
    deleteQuestionPack 
}

