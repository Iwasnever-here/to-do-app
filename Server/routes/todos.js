const express = require("express");
const router = express.Router();
const TodoModel = require("../Models/Todo");
const jwt = require("jsonwebtoken");


router.get("/", async (req, res) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    console.log('Auth token:', token);


    if (!token) return res.status(401).json({ msg: 'No token provided' });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    console.log('Decoded userId:', userId);

    const todos = await TodoModel.find({ userId });

    res.json(todos);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post("/", async (req, res) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) return res.status(401).json({ msg: 'No token provided' });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    const { task } = req.body;

    const newTodo = await TodoModel.create({
      task,
      userId,
    });

    res.status(201).json(newTodo);
  } catch (error) {
    res.status(500).json({ msg: "Failed to create todo", error });
  }
});

router.put("/update/:id", async (req, res) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) return res.status(401).json({ msg: 'No token provided' });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    const todo = await TodoModel.findOne({ _id: req.params.id, userId });
    if (!todo) return res.status(404).json({ msg: "Todo not found" });

    todo.done = !todo.done;
    await todo.save();
    res.json(todo);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.delete("/delete", async (req, res) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) return res.status(401).json({ msg: 'No token provided' });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    const result = await TodoModel.deleteMany({ userId });
    res.json(result);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/progress", async (req, res) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) return res.status(401).json({ msg: 'No token provided' });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    const total = await TodoModel.countDocuments({ userId });
    const completed = await TodoModel.countDocuments({ userId, done: true });
    res.json({ total, completed });
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
