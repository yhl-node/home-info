/*
 * @Author: yhl, yhl@1024hw.org
 * @Date: 2018-08-11 23:10:47
 * @Last Modified by: yhl
 * @Last Modified time: 2018-08-18 17:07:12
 */
import config from 'config'
import Sequelize from 'sequelize'
import User from '../lib/user'
import helper from './helper'
import UserMetersModel from '../models/user_meters'

const MeterDB = UserMetersModel(helper.db, Sequelize)
async function updateUserMeter (uid) {
  try {
    let user = new User(uid, config)
    let userMeters = await user.getUserMeter()
    if (userMeters) {
      for (let index = 0; index < userMeters.length; index++) {
        const userMeter = userMeters[index]
        let meterDB = await MeterDB.findOne({ where: { 'mid': userMeter.mid }, attributes: ['mid'] })
        await helper.updateOrCreate(MeterDB, meterDB, userMeter, {'user_id': uid})
      }
    }
  } catch (error) {
    console.error(`update user meter error: ${uid}`)
  }
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
        console.error('update user meter error ! ! !')
      }
      allPromise = []
    } else {
      allPromise.push(updateUserMeter(uid))
    }
  }
}

export default start
