const mongoose = require('mongoose')

// Import models
const User = require('../models/User.model')

// User module
module.exports = {
  createUser: async (req, res) => {
    let newUser   //  New user to create

    // Create user
    newUser = await User.create({
      displayName: req.body.displayName,
      email: req.body.email,
      password: req.body.password,
      telNo: req.body.telNo,
      avatarUrl: req.body.avatarUrl
    }).then(data => data)
      .catch(err => err)

    // Sending out data
    if (newUser === null) {
      res.json({
        status: false,
        error: 'Unable to create user'
      })
    } else {
      res.json({
        status: true,
        data: newUser
      })
    }
  },
  getAll: async (req, res) => {
    let allUser // To get all user in database

    // Get all user in database
    allUser = await User.getAll({})
      .then(data => data)
      .catch(err => err)

    // sending data
    if (allUser === null) {
      res.json({
        status: false,
        error: 'None user in database'
      })
    } else {
      res.json({
        status: true,
        data: res.json(allUser)
      })
    }
  },
  getUserByName: async (req, res) => {
    const userName = res.params.displayName   // userName that get from user
    let oneUser   // user that found

    oneUser = await User.getOne({
      displayName: userName
    }).then(date => data)
      .catch(err => err)

    if (oneUser === null) {
      res.json({
        status: false,
        error: `Not found`
      })
    } else {
      res.json({
        status: true,
        data: res.json(oneUser)
      })
    }
  }
}
