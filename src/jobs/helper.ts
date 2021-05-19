/*
 * @Author: yhl, yhl@1024hw.org
 * @Date: 2018-08-11 23:10:57
 * @Last Modified by: yhl
 * @Last Modified time: 2021-05-14 16:09:58
 */
import { Sequelize } from 'sequelize'
import config from 'config'

const sequelize = new Sequelize({
  host: config.get('mysql.host'),
  username: config.get('mysql.user'),
  password: config.get('mysql.pwd'),
  database: config.get('mysql.db'),
  dialect: 'mysql',
  define: { timestamps: false },
  logging: false
})

function updateOrCreate (model: any, obj: any, info: any, addInfo = {}) {
  if (obj) {
    return obj.update(info)
  } else if (info) {
    return model.create(Object.assign(info, addInfo))
  }
}

export default {
  db: sequelize,
  updateOrCreate
}
