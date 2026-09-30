import {
  createNewTask,
  deleteTaskById,
  getTaskById,
  getTasks,
  updateTaskById,
} from "../services/task.service.js";
import asyncHandler from "../utils/asyncHandler.js";

// GET ALL TASK
export const getAllTask = asyncHandler(async (req, res) => {
  const tasks = await getTasks();

  return res.status(200).json({
    success: true,
    message: `${tasks.length} items found.`,
    tasks,
  });
});
// *****************************************************************************************
// CREATE
export const createTask = asyncHandler(async (req, res) => {
  const newTask = await createNewTask(req.body);

  return res.status(201).json({
    success: true,
    message: "✅ Task created successfully.",
    task: newTask,
  });
});
// *****************************************************************************************
// GET
export const getSingleTask = asyncHandler(async (req, res) => {
  const getTask = await getTaskById(req.params.id);

  return res.status(200).json({
    success: true,
    message: "Task found successfully.",
    task: getTask,
  });
});
// *****************************************************************************************
// UPDATE

export const updateTask = asyncHandler(async (req, res) => {
  const updatedTask = await updateTaskById(req.params.id, req.body);

  return res.status(200).json({
    success: true,
    message: "Task updated successfully.",
    task: updatedTask,
  });
});
// *****************************************************************************************
// DELETE
export const removeTask = asyncHandler(async (req, res) => {
  await deleteTaskById(req.params.id);
  return res.status(200).json({
    success: true,
    message: "Task deleted successfully.",
  });
});
