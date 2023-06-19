const { Types } = require('mongoose');
const { Task } = require('../../../models');
const { createTask, getTasks, updateTaskById, deleteTaskById } = require('../../../services/task.service');
const { taskData, updatedTaskData } = require('../../fixtures/tasks');
const { connect, disconnect } = require('../../../helpers/testDbConnection');

beforeAll(async () => {
  await connect();
}, 15000);

afterAll(async () => {
  await disconnect();
});

beforeEach(async () => {
  await Task.deleteMany();
});

describe('Task Service', () => {
  describe('createTask', () => {
    it('should create a new task', async () => {
      const createdTask = await createTask(taskData);

      expect(createdTask.task).toBe(taskData.task);
      expect(createdTask.status).toBe(taskData.status);
    });
  });

  describe('getTasks', () => {
    it('should get all tasks', async () => {
      const tasks = await getTasks();

      expect(tasks).toBeDefined();
      expect(Array.isArray(tasks)).toBe(true);
    });
  });

  describe('updateTaskById', () => {
    it('should update an existing task', async () => {
      const createdTask = await createTask(taskData);

      const { _id } = createdTask[0];
      const updatedTask = await updateTaskById(_id, updatedTaskData);

      expect(updatedTask.task).toBe(updatedTaskData.task);
      expect(updatedTask.status).toBe(updatedTaskData.status);
    });

    it('should throw an error when updating a non-existing task', async () => {
      const fakeObjectId = Types.ObjectId();

      await expect(updateTaskById(fakeObjectId, updatedTaskData)).rejects.toThrow('Task not found');
    });
  });

  describe('deleteTaskById', () => {
    it('should delete an existing task', async () => {
      const createdTask = await createTask(taskData);

      const { _id } = createdTask[0];
      const deletedTask = await deleteTaskById(_id);

      expect(deletedTask._id).toEqual(_id);
    });

    it('should throw an error when deleting a non-existing task', async () => {
      const fakeObjectId = Types.ObjectId();

      await expect(deleteTaskById(fakeObjectId)).rejects.toThrow('Task not found');
    });
  });
});
