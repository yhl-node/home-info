/*
 * @Author: yhl, yhl@1024hw.org
 * @Date: 2018-08-11 23:10:51
 * @Last Modified by: yhl
 * @Last Modified time: 2018-08-12 09:27:37
 */
const config = require('config')
const Sequelize = require('sequelize')
const Meter = require('../lib/meter')
const helper = require('./helper')
const MeterDB = require('../models/user_meters')(helper.db, Sequelize)
const MeterInfoDB = require('../models/meters')(helper.db, Sequelize)
const MeterLog = require('../models/meters_update_log')(helper.db, Sequelize)

async function updateMeterInfo (mid) {
  try {
    let meter = new Meter(mid, config)
    let [meterInfoDB, meterInfo] = await Promise.all([
      MeterInfoDB.findOne({where: {'mid': mid}, attributes: ['mid']}),
      meter.getMeterInfo()
    ])
    meterInfo && !meterInfo.lastReadTime && (meterInfo.lastReadTime = null)
    if (meterInfo.lastReadTime) {
      await Promise.all([
        helper.updateOrCreate(MeterInfoDB, meterInfoDB, meterInfo),
        MeterLog.create(meterInfo)
      ])
    } else {
      await helper.updateOrCreate(MeterInfoDB, meterInfoDB, meterInfo)
    }
  } catch (error) {
    console.error(`update meter error: ${mid}`)
  }
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
        console.error('update meter failed ! ! !')
      }
      allPromise = []
    } else {
      allPromise.push(updateMeterInfo(mid))
    }
  }
}

module.exports = start
