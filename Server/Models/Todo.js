const mongoose = require('mongoose')

const TodoSchema = new mongoose.Schema({
  task: String,
  done: {
    type: Boolean,
    default: false
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true
  }
})

const TodoModel = mongoose.model("Todo", TodoSchema)

module.exports = TodoModel
