const httpStatus = require('http-status');
const { createTask, getTasks, deleteTask, updateTask } = require('../../controllers/task.controller');

jest.mock('../../services/task.service');

describe('Task Controller', () => {
  describe('createTask', () => {
    test('should create a new task and return 201 status code', async () => {
      const taskName = 'Dinner';
      const mockReq = {
        body: {
          task: taskName,
        },
      };
      const mockRes = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      };

      await createTask(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(httpStatus.CREATED);
      expect(mockRes.send).toHaveBeenCalled();
    });
  });

  describe('getTasks', () => {
    test('should return all tasks', async () => {
      const mockRes = {
        send: jest.fn(),
      };

      await getTasks({}, mockRes);

      expect(mockRes.send).toHaveBeenCalled();
    });
  });

  describe('updateTask', () => {
    test('should update a task and return the updated task', async () => {
      const updatedTask = 'Gym';
      const mockReq = {
        params: {
          id: 'task_id',
        },
        body: {
          task: updatedTask,
        },
      };
      const mockRes = {
        send: jest.fn(),
      };

      await updateTask(mockReq, mockRes);

      expect(mockRes.send).toHaveBeenCalled();
    });
  });

  describe('deleteTask', () => {
    test('should delete a task and return 204 status code', async () => {
      const mockReq = {
        params: {
          id: 'task_id',
        },
      };
      const mockRes = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      };

      await deleteTask(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(httpStatus.NO_CONTENT);
      expect(mockRes.send).toHaveBeenCalled();
    });
  });
});
