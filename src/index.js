require('dotenv').config()
const config = require('config')
const Sequelize = require('sequelize')
const Meter = require('./lib/meter')
const User = require('./lib/user')
const sequelize = new Sequelize(config.mysql.url, {
  define: { timestamps: false },
  logging: false
})
const UserDB = require('./models/users')(sequelize, Sequelize)
const MeterDB = require('./models/user_meters')(sequelize, Sequelize)

async function getInfo (uid) {
  let user = new User(uid, config)
  let userMeters = await user.getUserMeter()
  userMeters && userMeters.forEach(async userMeter => {
    let meter = new Meter(userMeter.mid, config)
    let meterInfo = await meter.getMeterInfo()
    meterInfo &&
    (meterInfo.balanceAmount > 100) &&
    console.log(`${meterInfo.balanceAmount}`)
  })
}

async function getUserInfo (uid) {
  let user = new User(uid, config)
  let userInfo = await user.getUserInfo()
  let userMeters = await user.getUserMeter()
  if (userInfo) {
    let userDB = await UserDB.findOne({ where: {'user_id': uid}, attributes: ['user_id'] })
    if (userDB) {
      userDB.update(userInfo)
    } else {
      UserDB.create(Object.assign(userInfo, { 'user_id': uid }))
    }
  }
  if (userMeters) {
    for (let index = 0; index < userMeters.length; index++) {
      const userMeter = userMeters[index]
      let meterDB = await MeterDB.findOne({ where: {'mid': userMeter.mid}, attributes: ['mid'] })
      if (meterDB) {
        meterDB.update(userMeter)
      } else {
        MeterDB.create(Object.assign(userMeter, { 'user_id': uid }))
      }
    }
  }
  return true
}

async function start () {
  let allPromise = []
  for (let index = 1; index <= config.maxUid; index++) {
    if (allPromise.length >= config.maxPromise || index === config.maxUid) {
      allPromise.push(getUserInfo(index))
      try {
        await Promise.all(allPromise)
        if (index === config.maxUid) {
          // 如果不执行close，会导致进程无法退出
          sequelize.close()
        }
      } catch (err) {
        console.log(err)
      }
      allPromise = []
    } else {
      allPromise.push(getUserInfo(index))
    }
  }
}

start()
