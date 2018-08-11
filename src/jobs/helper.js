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
