/*
 * @Author: yhl, yhl@1024hw.org
 * @Date: 2018-08-11 23:10:47
 * @Last Modified by: yhl
 * @Last Modified time: 2021-05-19 17:17:03
 */
import config from 'config'
import User from '../lib/user'
import helper from './helper'
import db from '../models'

async function updateUserMeter (uid: number) {
  try {
    const user = new User(uid, config)
    const userMeters = await user.getUserMeter()
    if (userMeters) {
      for (let index = 0; index < userMeters.length; index++) {
        const userMeter = userMeters[index]
        const meterDB = await db.models.UserMeter.findOne({ where: { mid: userMeter.mid }, attributes: ['mid'] })
        await helper.updateOrCreate(db.models.UserMeter, meterDB, userMeter, { user_id: uid })
      }
    }
  } catch (error) {
    console.error(`update user meter error: ${uid}`)
  }
}

async function start () {
  const len = Number(config.get('maxUid'))
  let allPromise = []
  for (let index = 1; index <= len; index++) {
    const uid = index
    const maxLen = Number(config.get('maxPromise'))
    if (allPromise.length >= maxLen || index === len) {
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
