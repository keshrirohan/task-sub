import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  Fullname: {
    type: String,
    required: true,
  },
  Task: {
    type: String,
    required: true,
  },
  Submitdate: {
    type: Date,
    required: true,
  },
});
const TaskModel = mongoose.model("Task", taskSchema);

export default TaskModel;
