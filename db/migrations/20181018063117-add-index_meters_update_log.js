'use strict'
module.exports = {
  up: (queryInterface, Sequelize) => {
    let migrations = []
    migrations.push(queryInterface.addIndex('meters_update_log', {
      fields: ['mid', 'lastReadTime'],
      unique: true,
      name: 'IDX',
      type: 'UNIQUE'
    }))
    migrations.push(queryInterface.addIndex('meters_update_log', {
      fields: ['mid'],
      name: 'IDX_MID'
    }))
    return Promise.all(migrations)
  },
  down: (queryInterface, Sequelize) => {
    let migrations = []
    migrations.push(queryInterface.removeIndex('meters_update_log', 'IDX'))
    migrations.push(queryInterface.removeIndex('meters_update_log', 'IDX_MID'))
    return Promise.all(migrations)
  }
}
