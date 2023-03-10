const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { taskService } = require('../services');

const createTask = catchAsync(async (req, res) => {
  const user = await taskService.createTask(req.body);
  res.status(httpStatus.CREATED).send(user);
});

const getTasks = catchAsync(async (req, res) => {
  const result = await taskService.getTasks();
  res.send(result);
});

const updateTask = catchAsync(async (req, res) => {
  const result = await taskService.updateTaskById(req.params.id, req.body);
  res.send(result);
  });

const deleteTask = catchAsync(async (req, res) => {
  const response = await taskService.deleteTaskById(req.params.id);
  res.status(httpStatus.NO_CONTENT).send(response);
});

module.exports = {
    createTask, 
    getTasks, 
    deleteTask, 
    updateTask
};
