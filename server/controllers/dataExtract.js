import TaskModel from "../model/task.model.js";

const dataExtract = async (req, res) => {
  try {
    const allTask = await TaskModel.find({});
    res
      .status(200)
      .json({ message: "Data fetched successfully", data: allTask });
  } catch (error) {
    res.status(500).json({ message: "internal server error" });
  }
};

export default dataExtract;
