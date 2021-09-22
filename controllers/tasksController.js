let data = require('../data');
// const slugify = require('slugify');

exports.getTasks = async (req, res, next) => {
  try {
    res.json(data);
  } catch (error) {
    next(error);
  }
};

exports.createTask = async (req, res, next) => {
  try {
    let task = req.body;
    task.id = data[data.length - 1].id + 1;
    data.push(task);
    res.status(201).json(task);
  } catch (error) {
    next(error);
  }
};

exports.deleteTask = async (req, res, next) => {
  try {
    const task = data.find((task) => task.id === +req.params.taskId);
    if (!task) {
      res.status(404).json({ message: 'Task not found' }).end();
    } else {
      data = data.filter((task) => task.id !== +req.params.taskId);
      res.status(204).end();
    }
  } catch (error) {
    next(error);
  }
};
exports.updateTask = async (req, res, next) => {
  try {
    const task = data.find((task) => task.id === +req.params.taskId);
    if (!task) {
      res.status(404).json({ message: 'Task not found' }).end();
    } else {
      const newTask = req.body;
      newTask.id = +req.params.taskId;
      data = data.map((task) =>
        task.id === +req.params.taskId ? newTask : task
      );
      res.status(201).json(req.body);
    }
  } catch (error) {
    next(error);
  }
};
