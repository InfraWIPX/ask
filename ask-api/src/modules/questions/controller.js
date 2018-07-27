import questionModel from 'api/modules/questions/model'
import roomnModel from 'api/modules/rooms/model'
import _ from 'lodash'

const statusCallback = {
  SUCCESS: 'SUCCESS',
  CLOSED: 'CLOSED',
  ERROR: 'ERROR',
}

export default {
  getAll: async (req, res) => {
    const questions = await questionModel.getAll()
    res.send(questions)
  },
  getById: async (req, res) => {
    const id = req.params.id
    const questions = await questionModel.getById(id) || {}
    res.send(questions)
  },
  getByRoomId: async (req, res) => {
    const roomId = req.params.id
    const questions = await questionModel.getByRoomId(roomId)
    res.send(questions)
  },
  update: async (req, res) => {
    const { questionIds } = req.body
    if (_.isArray(questionIds) && questionIds.length > 0) {
      const data = await questionModel.update(questionIds)

      if (data) {
        res.send({
          status: 'success',
        })
      } else {
        res.send({
          status: 'fail',
        })
      }
    } else {
      res.send({
        status: 'fail',
      })
    }
  },
  create: async (req, res) => {
    const { roomId, name, anonymous, question } = req.body
    if (_.isNumber(roomId) &&
    _.isString(name) &&
    _.isBoolean(anonymous) &&
    _.isString(question)) {
      const room = await roomnModel.getById(roomId)
      console.log(room)
      if (room) {
        if (room.canSend) {
          const data = await questionModel.create({ roomId, name, anonymous, question })
          res.send({ status: data ? statusCallback.SUCCESS : statusCallback.ERROR })
        } else {
          res.send({ status: statusCallback.CLOSED })
        }
      } else {
        res.send({ status: statusCallback.ERROR })
      }
    } else {
      res.send({ status: statusCallback.ERROR })
    }
  },
}