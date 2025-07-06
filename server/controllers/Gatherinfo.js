import express from "express";
import TaskModel from "../model/task.model.js";

const Gatherinfo = async (req, res, next) => {
  try {
    const { Fullname, Task, Submitdate } = req.body;
    if (!Fullname || !Task || !Submitdate) {
      res
        .status(400)
        .json({ message: "Every detail is mandatory", success: false });
      return;
    }
    const taskdetail = await TaskModel.findOne({ Task });

    if (taskdetail) {
      res.status(409).json({
        message: "Task already submitted",
        success: false,
      });
      return;
    }
    const newtask = new TaskModel({
      Fullname,
      Task,
      Submitdate,
    });

    await newtask.save();

    res
      .status(201)
      .json({ message: "Task submitted successfully", success: true });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

export default Gatherinfo;
