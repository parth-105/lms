import mongoose from "mongoose";
import Question from '@/model/quiz/question-model'

const examSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    totalMarks: {
      type: Number,
      required: true,
    },
    passingMarks: {
      type: Number,
      required: true,
    },
    questions:{
      type: [mongoose.Schema.Types.ObjectId],
      ref: 'Question',
      required: true,
    },
    instructor: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "Please provide an instructor id"],
      ref: 'Instructor'
  },
    
  },
  {
    timestamps: true,
  }
);

const Exam = mongoose.models.Exam || mongoose.model("Exam", examSchema);

export default Exam;
