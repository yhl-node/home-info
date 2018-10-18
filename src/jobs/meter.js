/*
 * @Author: yhl, yhl@1024hw.org
 * @Date: 2018-08-11 23:10:51
 * @Last Modified by: yhl
 * @Last Modified time: 2018-10-18 20:22:48
 */
import config from 'config'
import Sequelize from 'sequelize'
import Meter from '../lib/meter'
import helper from './helper'
import UserMetersModel from '../models/user_meters'
import MetersModel from '../models/meters'
import MetersUpdateLogModel from '../models/meters_update_log'

const MeterDB = UserMetersModel(helper.db, Sequelize)
const MeterInfoDB = MetersModel(helper.db, Sequelize)
const MeterLog = MetersUpdateLogModel(helper.db, Sequelize)

async function updateMeterInfo (mid) {
  try {
    let meter = new Meter(mid, config)
    let [meterInfoDB, meterInfo] = await Promise.all([
      MeterInfoDB.findOne({ where: { 'mid': mid }, attributes: ['mid', 'meterValue'] }),
      meter.getMeterInfo()
    ])
    meterInfo && !meterInfo.lastReadTime && (meterInfo.lastReadTime = null)
    if (meterInfo.lastReadTime && meterInfoDB) {
      meterInfo = Object.assign(meterInfo, {
        diffMeter: meterInfo.meterValue - meterInfoDB.meterValue
      })
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

export default start
