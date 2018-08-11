/*
 * @Author: yhl, yhl@1024hw.org
 * @Date: 2018-08-11 23:10:57
 * @Last Modified by:   yhl
 * @Last Modified time: 2018-08-11 23:10:57
 */
const Sequelize = require('sequelize')
const config = require('config')
const sequelize = new Sequelize(config.mysql.url, {
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

module.exports = {
  db: sequelize,
  updateOrCreate
}
