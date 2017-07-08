// IMPORT MODELS
const Rooms = require('../models/Rooms')

// QUESTIONS CONTROLLER
module.exports = {
  getAll: (req, res) => {
    res.send("Question.getALL")
  },
  getQuestions: (req, res) => {
    res.send('Question.getQuestions')
  },
  getQuestion: (req, res) => {
    res.send(`Question.getQuestion with QID: ${req.params.id}`)
  },
  send: (req, res) => {
    res.send('Question.send')
  }
}
