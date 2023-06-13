const mongoose = require('mongoose');

const taskSchema = mongoose.Schema({
  task: {
    type: String,
    required: true,
  },
  status: {
    type: String,
  },
  creationDate: {
    type: Date,
    required: true,
  },
  completionDate: {
    type: Date,
  },
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
