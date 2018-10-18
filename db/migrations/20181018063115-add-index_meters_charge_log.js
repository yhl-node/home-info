'use strict'
module.exports = {
  up: (queryInterface, Sequelize) => {
    let migrations = []
    migrations.push(queryInterface.addIndex('meters_charge_log', {
      fields: ['mid', 'meter_id'],
      unique: true,
      name: 'IDX',
      type: 'UNIQUE'
    }))
    migrations.push(queryInterface.addIndex('meters_charge_log', {
      fields: ['mid'],
      name: 'IDX_MID'
    }))
    migrations.push(queryInterface.addIndex('meters_charge_log', {
      fields: ['meter_id'],
      name: 'IDX_METER_ID'
    }))
    return Promise.all(migrations)
  },
  down: (queryInterface, Sequelize) => {
    let migrations = []
    migrations.push(queryInterface.removeIndex('meters_charge_log', 'IDX'))
    migrations.push(queryInterface.removeIndex('meters_charge_log', 'IDX_MID'))
    migrations.push(queryInterface.removeIndex('meters_charge_log', 'IDX_METER_ID'))
    return Promise.all(migrations)
  }
}
