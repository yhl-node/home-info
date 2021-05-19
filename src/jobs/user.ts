/*
 * @Author: yhl, yhl@1024hw.org
 * @Date: 2018-08-11 23:10:41
 * @Last Modified by: yhl
 * @Last Modified time: 2021-05-19 17:21:24
 */
import config from 'config'
import User from '../lib/user'
import helper from './helper'
import db from '../models'

async function updateUser (uid: number) {
  try {
    const user = new User(uid, config)
    const [userInfo, userDB] = await Promise.all([
      user.getUserInfo(),
      db.models.User.findOne({ where: { user_id: uid }, attributes: ['user_id'] })
    ])
    await helper.updateOrCreate(db.models.User, userDB, userInfo, { user_id: uid })
  } catch (error) {
    console.error(`update user error: ${uid}`)
  }
}

async function start () {
  let allPromise = []
  const DBUserId = await db.models.User.max('user_id')
  let maxUid = Number(config.get('maxUid'))
  Number(DBUserId) >= maxUid && (maxUid = Number(DBUserId) + 10)

  const maxLen = Number(config.get('maxPromise'))
  for (let index = 1; index <= maxUid; index++) {
    if (allPromise.length >= maxLen || index === maxUid) {
      allPromise.push(updateUser(index))
      try {
        await Promise.all(allPromise)
      } catch (err) {
        console.error('update user error ! ! !')
      }
      allPromise = []
    } else {
      allPromise.push(updateUser(index))
    }
  }
}

export default start
