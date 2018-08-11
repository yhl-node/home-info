const config = require('config')
const Sequelize = require('sequelize')
const User = require('../lib/user')
const helper = require('./helper')
const UserDB = require('../models/users')(helper.db, Sequelize)

async function updateUser (uid) {
  console.log(`update user: ${uid}`)
  let user = new User(uid, config)
  let [userInfo, userDB] = await Promise.all([
    user.getUserInfo(),
    UserDB.findOne({ where: { 'user_id': uid }, attributes: ['user_id'] })
  ])
  await helper.updateOrCreate(UserDB, userDB, userInfo, { 'user_id': uid })
}

async function start () {
  let allPromise = []
  for (let index = 1; index <= config.maxUid; index++) {
    if (allPromise.length >= config.maxPromise || index === config.maxUid) {
      allPromise.push(updateUser(index))
      try {
        await Promise.all(allPromise)
      } catch (err) {
        // console.log(err)
      }
      allPromise = []
    } else {
      allPromise.push(updateUser(index))
    }
  }
}

module.exports = start
