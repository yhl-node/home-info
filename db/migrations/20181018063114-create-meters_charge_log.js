'use strict'
/**
 * http://docs.sequelizejs.com/class/lib/query-interface.js~QueryInterface.html
 */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('meters_charge_log', {
      meter_id: {
        allowNull: false,
        defaultValue: 0,
        type: Sequelize.INTEGER
      },
      mid: Sequelize.INTEGER,
      amount: {
        defaultValue: 0.000,
        type: Sequelize.DECIMAL(10, 3)
      },
      chargeTime: Sequelize.DATE,
      quantity: Sequelize.DECIMAL(10, 2),
      remainAmount: Sequelize.DECIMAL(10, 2)
    })
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('meters_charge_log')
  }
}
