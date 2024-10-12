import mongoose from "mongoose";

const reportSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    exam: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Exam",
    },
    result: {
      type: Object,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Report = mongoose.models.Report || mongoose.model("Report", reportSchema);

export default Report;


