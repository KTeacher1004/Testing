const mongoose = require("mongoose");
const { Schema } = mongoose;

const questionPackSchema = new Schema(
	{
		name: { type: String, require: true },
        teachername: { type: String, required: true, unique: true, sparse: true },
        numberOfQuestion: { type: Number, required: true},
        questions: [{ type: Schema.Types.ObjectId, ref: "Question" }],
        subjects: {type: String, enum:["Maths", "History", "English", "IT"], default: ""},
        role: { type: String, enum: ["Teacher", "Student"], default: "Student" },
        packType: {type: String, enum: ["Test", "PracticeTest"], default: ""}
	},
	{ timestamps: true }
);

const QuestionPack = mongoose.model("QuestionPack", questionPackSchema);

module.exports = QuestionPack;
