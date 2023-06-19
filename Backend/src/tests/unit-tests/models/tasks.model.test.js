const { Task } = require('../../../models');

describe('Task model', () => {
  describe('schema', () => {
    test('should have the expected properties', () => {
      const task = new Task();
      const id = task._id;
      const tasks = Task.findById(id);
      const schema = tasks.schema.obj;

      expect(schema.task).toBeDefined();
      expect(schema.status).toBeDefined();
      expect(schema.creationDate).toBeDefined();
      expect(schema.completionDate).toBeDefined();
    });

    test('should require task and creationDate fields', () => {
      const task = new Task();
      const { errors } = task.validateSync();
      expect(errors.task).toBeDefined();
      expect(errors.creationDate).toBeDefined();
    });
  });
});
