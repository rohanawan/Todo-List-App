const httpStatus = require('http-status');
const { Task } = require('../models');
const ApiError = require('../utils/ApiError');

const getDataByTask = async (body) => Task.findOne({ task: body });

const createTask = async (taskBody) => {
  const task = await getDataByTask(taskBody.task);
  if (task) {
    throw new ApiError(httpStatus.CONFLICT, 'Task Already Exists');
  }
  return Task.create(taskBody);
};

const getTasks = async () => Task.find();

const getTaskById = async (id) => Task.findById(id);

const updateTaskById = async (id, updateBody) => {
  const task = await getTaskById(id);
  if (!task) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Task not found');
  }
  Object.assign(task, updateBody);
  await task.save();
  return task;
};

const deleteTaskById = async (id) => {
  const task = await getTaskById(id);
  if (!task) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Task not found');
  }
  await task.remove();
  return task;
};

module.exports = {
  createTask,
  getTasks,
  updateTaskById,
  deleteTaskById,
};
