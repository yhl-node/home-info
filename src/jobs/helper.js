/*
 * @Author: yhl, yhl@1024hw.org
 * @Date: 2018-08-11 23:10:57
 * @Last Modified by: yhl
 * @Last Modified time: 2018-10-18 20:34:16
 */
import Sequelize from 'sequelize'
import config from 'config'

// const sequelize = new Sequelize(config.mysql.url, {
//   define: { timestamps: false },
//   logging: false
// })
const sequelize = new Sequelize({
  host: config.mysql.host,
  username: config.mysql.user,
  password: config.mysql.pwd,
  database: config.mysql.db,
  dialect: 'mysql',
  define: { timestamps: false },
  logging: false
})

function updateOrCreate (model, obj, info, addInfo = {}) {
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
