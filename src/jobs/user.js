/*
 * @Author: yhl, yhl@1024hw.org
 * @Date: 2018-08-11 23:10:41
 * @Last Modified by: yhl
 * @Last Modified time: 2021-02-27 22:49:07
 */
import config from 'config'
import Sequelize from 'sequelize'
import User from '../lib/user'
import helper from './helper'
import UsersModel from '../models/users'

const UserDB = UsersModel(helper.db, Sequelize)

async function updateUser (uid) {
  try {
    const user = new User(uid, config)
    const [userInfo, userDB] = await Promise.all([
      user.getUserInfo(),
      UserDB.findOne({ where: { user_id: uid }, attributes: ['user_id'] })
    ])
    await helper.updateOrCreate(UserDB, userDB, userInfo, { user_id: uid })
  } catch (error) {
    console.error(`update user error: ${uid}`)
  }
}

async function start () {
  let allPromise = []
  const DBUserId = await UserDB.max('user_id')
  let maxUid = config.maxUid
  DBUserId >= config.maxUid && (maxUid = DBUserId + 10)
  for (let index = 1; index <= maxUid; index++) {
    if (allPromise.length >= config.maxPromise || index === maxUid) {
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
