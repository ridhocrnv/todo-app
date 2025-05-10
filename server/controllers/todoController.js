const Todo = require('../models/todo');

exports.getTodos = async (req, res) => {
  const todos = await Todo.find({ userId: req.user.id });
  res.json(todos);
};

exports.createTodo = async (req, res) => {
  const { text } = req.body;
  const newTodo = new Todo({ userId: req.user.id, text });
  await newTodo.save();
  res.status(201).json(newTodo);
};

exports.updateTodo = async (req, res) => {
  const { id } = req.params;
  const { completed } = req.body;
  const updated = await Todo.findOneAndUpdate(
    { _id: id, userId: req.user.id },
    { completed },
    { new: true }
  );
  res.json(updated);
};

exports.deleteTodo = async (req, res) => {
  const { id } = req.params;
  await Todo.findOneAndDelete({ _id: id, userId: req.user.id });
  res.json({ message: 'Deleted' });
};
