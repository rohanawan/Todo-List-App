const httpStatus = require('http-status');
const { Task } = require('../../../models');
const { createTask, getTasks, updateTaskById, deleteTaskById } = require('../../../services/task.service');
const { taskData } = require('../../fixtures/tasks');
const ApiError = require('../../../utils/ApiError');

jest.mock('../../../models');

describe('Task Service', () => {
  describe('createTask', () => {
    test('should create a new task', async () => {
      const taskName = 'Gym';

      const taskBody = {
        task: taskName,
      };

      const findTask = Task.findOne.mockResolvedValue(null);
      const created = Task.create.mockResolvedValue(taskBody);

      const result = await createTask(taskBody);

      expect(findTask).toHaveBeenCalledWith({ task: taskName });
      expect(created).toHaveBeenCalledWith(taskBody);
      expect(result).toEqual(taskBody);
    });

    test('should throw an error if task already exists', async () => {
      const taskBody = {
        task: 'Existing Task',
      };

      Task.findOne.mockResolvedValue(taskBody);

      await expect(createTask(taskBody)).rejects.toThrow(new ApiError(httpStatus.CONFLICT, 'Task Already Exists'));
    });
  });

  describe('getTasks', () => {
    test('should retrieve all tasks', async () => {
      const findTasks = Task.find.mockResolvedValue(taskData);

      const result = await getTasks();

      expect(findTasks).toHaveBeenCalled();
      expect(result).toEqual(taskData);
    });
  });

  describe('updateTaskById', () => {
    test('should update a task by ID', async () => {
      const taskId = 'task_id';
      const taskTitle = 'Existing Task';
      const updateTask = 'Update Task';

      const updateBody = { title: updateTask };

      const existingTask = {
        _id: taskId,
        title: taskTitle,
        save: jest.fn().mockResolvedValue(),
      };

      const updatedTask = {
        _id: taskId,
        title: updateTask,
      };

      const findByID = Task.findById.mockResolvedValue(existingTask);
      existingTask.save.mockResolvedValue({ ...existingTask, ...updateBody });

      const result = await updateTaskById(taskId, updateBody);

      expect(findByID).toHaveBeenCalledWith(taskId);
      expect(existingTask.save).toHaveBeenCalled();
      expect(result).toEqual(expect.objectContaining(updatedTask));
    });

    test('should throw an error if task is not found', async () => {
      const taskId = 'non-existent-id';
      Task.findById.mockResolvedValue(null);

      await expect(updateTaskById(taskId, {})).rejects.toThrow(new ApiError(httpStatus.NOT_FOUND, 'Task not found'));
    });
  });

  describe('deleteTaskById', () => {
    test('should delete a task by ID', async () => {
      const taskId = 'task_id';

      const existingTask = {
        _id: taskId,
        remove: jest.fn().mockResolvedValue(),
      };

      const findByID = Task.findById.mockResolvedValue(existingTask);
      existingTask.remove.mockResolvedValue(existingTask);

      const result = await deleteTaskById(taskId);

      expect(findByID).toHaveBeenCalledWith(taskId);
      expect(existingTask.remove).toHaveBeenCalled();
      expect(result).toEqual(existingTask);
    });

    test('should throw an error if task is not found', async () => {
      const taskId = 'non-existent-id';
      Task.findById.mockResolvedValue(null);

      await expect(deleteTaskById(taskId)).rejects.toThrow(new ApiError(httpStatus.NOT_FOUND, 'Task not found'));
    });
  });
});
