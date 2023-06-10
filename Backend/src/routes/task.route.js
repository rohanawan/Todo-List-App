const express = require('express');
const {
  taskController: { createTask, getTasks, updateTask, deleteTask },
} = require('../controllers');

const router = express.Router();

router.route('/').post(createTask).get(getTasks);

router.route('/:id').patch(updateTask).delete(deleteTask);

module.exports = router;
