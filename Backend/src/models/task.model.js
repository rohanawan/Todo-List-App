const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const taskSchema = mongoose.Schema(
  {
    task: {
      type: String,
      required: true
    },
    status:{
        type: String,
    },
    creationDate:{
        type: Date,
        required: true
    },
    completionDate:{
      type: Date,
    }
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
taskSchema.plugin(toJSON);
taskSchema.plugin(paginate);

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
