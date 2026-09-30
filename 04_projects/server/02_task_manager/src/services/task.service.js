import Task from "../model/taskModel.js";
import { AppError } from "../utils/customError.js";

// GET TASKS
export const getTasks = async () => {
  const tasks = await Task.find().select("-__v").lean();

  return tasks;
};

// *****************************************************************************************
// CREATE NEW TASK
export const createNewTask = async (taskData) => {
  const { title, description, priority, status, dueDate } = taskData;

  const newTask = await Task.create({
    title,
    description,
    priority,
    status,
    dueDate,
  });

  return newTask;
};


// *****************************************************************************************
// GET TASK BY ID
export const getTaskById = async (taskID) => {
  const task = await Task.findById(taskID).select("-__v").lean();
  if (!task) {
    throw AppError(404, "Task not found!");
  }
  return task;
};

// *****************************************************************************************
// UPDATE TASK BY ID
export const updateTaskById = async (taskID, taskData) => {
  const task = await Task.findByIdAndUpdate(taskID, taskData, {
    new: true,
    runValidators: true,
  }).select("-__v").lean();

  if (!task) {
    throw AppError(404, "Task not found!");
  }

  return task;
};

// *****************************************************************************************
// DELETE TASK BY ID
export const deleteTaskById = async (taskID) => {
  const task = await Task.findByIdAndDelete(taskID).lean();
  if (!task) {
    throw AppError(404, "Task not found!");
  }
  return task;
};
