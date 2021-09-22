const express = require('express');

const {
  getTasks,
  updateTask,
  deleteTask,
  createTask,
} = require('../controllers/tasksController');

const router = express.Router();

router.get('/', getTasks);
router.post('/', createTask);
router.put('/:taskId', updateTask);
router.delete('/:taskId', deleteTask);

module.exports = router;
