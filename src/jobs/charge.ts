/*
 * @Author: yhl, yhl@1024hw.org
 * @Date: 2018-08-11 23:10:51
 * @Last Modified by: yhl
 * @Last Modified time: 2021-05-19 14:29:13
 */
import config from 'config'
import Meter from '../lib/meter'
import db from '../models'

async function updateMeterInfo (mid: number) {
  try {
    const meter = new Meter(mid, config)
    const meterInfo = await meter.getChargeInfo()
    if (meterInfo) {
      await Promise.all(meterInfo.map((meterInfo: any) => db.models.meterChargeLog.create(Object.assign(meterInfo, { meter_id: mid }))))
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
