const config = require('config')
const Sequelize = require('sequelize')
const User = require('../lib/user')
const helper = require('./helper')
const MeterDB = require('../models/user_meters')(helper.db, Sequelize)

async function updateUserMeter (uid) {
  console.log(`update user meter: ${uid}`)
  let user = new User(uid, config)
  let userMeters = await user.getUserMeter()
  if (userMeters) {
    for (let index = 0; index < userMeters.length; index++) {
      const userMeter = userMeters[index]
      let meterDB = await MeterDB.findOne({ where: { 'mid': userMeter.mid }, attributes: ['mid'] })
      await helper.updateOrCreate(MeterDB, meterDB, userMeter, {'user_id': uid})
    }
  }
  return true
}

async function start () {
  let len = config.maxUid
  let allPromise = []
  for (let index = 1; index <= len; index++) {
    let uid = index
    if (allPromise.length >= config.maxPromise || index === len) {
      allPromise.push(updateUserMeter(uid))
      try {
        await Promise.all(allPromise)
      } catch (err) {
        // console.log(err)
      }
      allPromise = []
    } else {
      allPromise.push(updateUserMeter(uid))
    }
  }
}

module.exports = start
