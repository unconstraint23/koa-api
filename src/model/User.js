const mongoose = require("mongoose")
const baseModel = require('./base')
const md5 = require("../util/md5")
const userSchema = new mongoose.Schema({
    ...baseModel,
    username: {
        type: String,
        required: true
      },
      email: {
        type: String,
        required: true
      },
      password: {
        type: String,
        required: true,
        set: value => md5(value),
        select: false
      },
      
      avatag: {
        type: String,
        default: null
      }
})

module.exports = userSchema