// IMPORT MODELS
const Rooms = require('../models/Rooms')

// QUESTIONS CONTROLLER
module.exports = {
  getAll: async (req, res) => {
    let rooms = await Rooms.getAll({})
      .then(data => data)
    res.json(rooms)
  },
  create: async (req, res) => {
    let code, chkRoomCode
    // Random room code
    do {
      code = Math.floor(Math.random() * (9999 - 1000)) + 1000
      chkRoomCode = await Rooms.getOne({
        code: code
      }).then(data => data)
    } while (chkRoomCode !== null)

    // Created room
    let result = await Rooms.create({
      code: code,
      title: req.body.title,
      // _ownerId: req.user.id,
      imgs: {
        cover: req.body.coverImg
      }
    })
    .then(data => data)
    .catch(err => err)

    res.json(result)
  },
  // To accress room that exist
  getRoomByID: async (req, res) => {
    const roomID = req.params.id
    // console.log(req.params)
    let returnRoomID = await Rooms.getOne({
      _id: roomID
    }).then(data => data)

    if (returnRoomID === null) {
      res.json({
        status: false
      })
    } else {
      res.json({
        status: true
      })
    }
  },
  // Deleting room
  updateIsDelete: async (req, res) => {
    let reqId = req.body.getidbodynaja

    let chkRoom = await Rooms.getOne({
      _id: reqId
    }).then(data => data)

    if (chkRoom === null) { // Room does not exists
      res.json({
        status: false,
        message: 'Room dose not exists'
      })
    } else {
      await Rooms.update({
        _id: reqId,
        isDelete: true
      }).then(data => data)
      res.json({
        status: true,
        message: 'the room was deleted'
      })
    }
  },
  // Update existing room
  updateRoomByID: async (req, res) => {
    // res.send(`Question.getQuestion with QID: ${req.params.id}`)
    let reqId = req.body.getidbodynaja
    let title = req.body.title
    let openSending = req.body.sending

    let chkRoom = await Rooms.getOne({
      _id: reqId
    }).then(data => data)

    if (chkRoom === null) { // Room does not exists
      res.json({
        status: false,
        message: 'Room dose not exists'
      })
    } else {
      await Rooms.update({
        _id: reqId,
        title: title,
        openSending: openSending
      }).then(data => data)
      res.json({
        status: true,
        message: 'update data success!'
      })
    }
  },
  // Accress room by code
  getRoomByCode: async (req, res) => {
    const userCode = req.params.code

    let room = await Rooms.getOne({
      code: userCode
    }).then(data => data)

    // Then sent part to go to ask room with key.
    if (room === null || room.isDelete) {
      res.json({
        status: false
      })
    }
    res.json({
      status: true,
      roomId: room._id,
      title: room.title,
      sending: room.openSending
    })
  }
}
