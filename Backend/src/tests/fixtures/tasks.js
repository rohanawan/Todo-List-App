const taskData = [
  {
    task: 'Task 1',
    status: 'Completed',
    creationDate: new Date(),
    completionDate: new Date(),
  },
  {
    task: 'Task 2',
    status: 'Completed',
    creationDate: new Date(),
    completionDate: new Date(),
  },
  {
    task: 'Task 3',
    status: 'Not Completed',
    creationDate: new Date(),
    completionDate: new Date(),
  },
];

const updatedTaskData = {
  task: 'Updated Task',
  status: 'Not Completed',
  creationDate: new Date(),
  completionDate: new Date(),
};
module.exports = {
  taskData,
  updatedTaskData,
};
