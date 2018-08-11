require('dotenv').config()
const config = require('config')
const updateMeter = require('./jobs/meter')
const updateUser = require('./jobs/user')
const updateUserMeter = require('./jobs/user_meter')

updateMeter()
setInterval(() => {
  console.log('updateMeter starting ................ ')
  updateMeter()
  console.log('updateMeter ending ................ ')
}, 30 * 60 * 1000)

setInterval(() => {
  console.log('updateUser starting ................ ')
  updateUser()
  console.log('updateUser ending ................ ')
}, 60 * 60 * 1000)

setInterval(() => {
  console.log('updateUserMeter starting ................ ')
  updateUserMeter()
  console.log('updateUserMeter ending ................ ')
}, 60 * 60 * 1000)
