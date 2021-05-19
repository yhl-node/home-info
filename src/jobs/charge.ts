/*
 * @Author: yhl, yhl@1024hw.org
 * @Date: 2018-08-11 23:10:51
 * @Last Modified by: yhl
 * @Last Modified time: 2021-05-14 16:31:21
 */
import config from 'config'
import Sequelize from 'sequelize'
import Meter from '../lib/meter'
import helper from './helper'
import UserMetersModel from '../models/user_meters'
import MetersChargeLogModel from '../models/meters_charge_log'

const MeterDB = UserMetersModel(helper.db, Sequelize)
const MeterChargeLog = MetersChargeLogModel(helper.db, Sequelize)

async function updateMeterInfo (mid: string) {
  try {
    const meter = new Meter(mid, config)
    const meterInfo = await meter.getChargeInfo()
    if (meterInfo) {
      await Promise.all(meterInfo.map((meterInfo: any) => MeterChargeLog.create(Object.assign(meterInfo, { meter_id: mid }))))
    }
  } catch (error) {
    console.error(`update meter error: ${mid}`)
  }
}

async function start () {
  const allMeter = await MeterDB.findAll({ attributes: ['mid'] })
  const len = allMeter.length
  let allPromise = []
  for (let index = 1; index <= len; index++) {
    const mid = allMeter[index - 1].mid
    const maxLen = Number(config.get('maxPromise'))
    if (allPromise.length >= maxLen || index === len) {
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
