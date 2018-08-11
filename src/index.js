require('dotenv').config()
const updateMeter = require('./jobs/meter')
const updateUser = require('./jobs/user')
const updateUserMeter = require('./jobs/user_meter')

setInterval(() => {
  updateMeter()
}, 30 * 60 * 1000)

setInterval(() => {
  updateUser()
}, 60 * 60 * 1000)

setInterval(() => {
  updateUserMeter()
}, 60 * 60 * 1000)
