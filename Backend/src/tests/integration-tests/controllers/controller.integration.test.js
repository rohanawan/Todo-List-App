const httpStatus = require('http-status');
const request = require('supertest');
const app = require('../../../app');
const { connect, disconnect } = require('../../../helpers/testDbConnection');
const { Task } = require('../../../models');
const { taskData, updatedTaskData } = require('../../fixtures/tasks');

beforeAll(async () => {
  await connect();
}, 15000);

afterAll(async () => {
  await disconnect();
});

beforeEach(async () => {
  await Task.deleteMany();
});

describe('Task Controller', () => {
  describe('POST /tasks', () => {
    test('should create a new task', async () => {
      const response = await request(app).post('/tasks').send(taskData).expect(httpStatus.CREATED);

      expect(response.body.task).toBe(taskData.task);
      expect(response.body.status).toBe(taskData.status);
    });
  });

  describe('GET /tasks', () => {
    test('should retrieve all tasks', async () => {
      await Task.create(taskData);

      const response = await request(app).get('/tasks').expect(httpStatus.OK);

      expect(response.statusCode).toBe(200);
      expect(response.body.length).toBe(3);
    });
  });

  describe('PATCH /tasks/:id', () => {
    test('should update task', async () => {
      const task = await Task.create(taskData);
      const { _id } = task[0];

      const response = await request(app).patch(`/tasks/${_id}`).send(updatedTaskData).expect(200);

      expect(response.body.task).toBe(updatedTaskData.task);
      expect(response.statusCode).toBe(200);
    });
  });

  describe('DELETE /tasks/:id', () => {
    test('should delete an existing task', async () => {
      const task = await Task.create(taskData);
      const { _id } = task[0];

      await request(app).delete(`/tasks/${_id}`).expect(204);
      const deletedTask = await Task.findById(_id);

      expect(deletedTask).toBeNull();
    });
  });
});
