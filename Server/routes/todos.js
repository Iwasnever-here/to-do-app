const express = require("express");
const router = express.Router();
const TodoModel = require("../Models/Todo");
const jwt = require("jsonwebtoken");

// get user from database - well check if user is in the database
router.get("/", async (req, res) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    console.log('Auth token:', token);

    if (!token) return res.json({ msg: 'No token provided' });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;
    console.log('Decoded userId:', userId);

    const todos = await TodoModel.find({ userId });

    res.json(todos);
  } catch (error) {
    res.json(error);
  }
});

// get the todos from the database
router.post("/", async (req, res) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) return res.json({ msg: 'No token provided' });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    const { task } = req.body;

    const newTodo = await TodoModel.create({
      task,
      userId,
    });

    res.json(newTodo);
  } catch (error) {
    res.json({ msg: "Failed to create todo", error });
  }
});

// update the todo at the id given in the database
router.put("/update/:id", async (req, res) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) return res.json({ msg: 'No token provided' });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    const todo = await TodoModel.findOne({ _id: req.params.id, userId });
    if (!todo) return res.json({ msg: "Todo not found" });

    todo.done = !todo.done;
    await todo.save();
    res.json(todo);
  } catch (error) {
    res.json(error);
  }
});

//delete all todos under the users id
router.delete("/delete", async (req, res) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) return res.json({ msg: 'No token provided' });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    const result = await TodoModel.deleteMany({ userId });
    res.json(result);
  } catch (error) {
    res.json(error);
  }
});

// get number of tasks and how many are done or not to give number to the progress bar
router.get("/progress", async (req, res) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) return res.json({ msg: 'No token provided' });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    const total = await TodoModel.countDocuments({ userId });
    const completed = await TodoModel.countDocuments({ userId, done: true });
    res.json({ total, completed });
  } catch (error) {
    res.json(error);
  }
});

module.exports = router;
