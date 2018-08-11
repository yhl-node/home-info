const config = require('config')
const Sequelize = require('sequelize')
const Meter = require('../lib/meter')
const helper = require('./helper')
const MeterDB = require('../models/user_meters')(helper.db, Sequelize)
const MeterInfoDB = require('../models/meters')(helper.db, Sequelize)
const MeterLog = require('../models/meters_update_log')(helper.db, Sequelize)

async function updateMeterInfo (mid) {
  console.log(`update meter: ${mid}`)
  let meter = new Meter(mid, config)
  let [meterInfoDB, meterInfo] = await Promise.all([
    MeterInfoDB.findOne({where: {'mid': mid}, attributes: ['mid']}),
    meter.getMeterInfo()
  ])
  meterInfo && !meterInfo.lastReadTime && (meterInfo.lastReadTime = null)
  await Promise.all([
    helper.updateOrCreate(MeterInfoDB, meterInfoDB, meterInfo),
    MeterLog.create(meterInfo)
  ])
}

async function start () {
  let allMeter = await MeterDB.findAll({ attributes: ['mid'] })
  let len = allMeter.length
  let allPromise = []
  for (let index = 1; index <= len; index++) {
    let mid = allMeter[index - 1].mid
    if (allPromise.length >= config.maxPromise || index === len) {
      allPromise.push(updateMeterInfo(mid))
      try {
        await Promise.all(allPromise)
      } catch (err) {
        // console.log(err)
      }
      allPromise = []
    } else {
      allPromise.push(updateMeterInfo(mid))
    }
  }
}

module.exports = start
