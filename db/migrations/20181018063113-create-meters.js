'use strict'
/**
 * http://docs.sequelizejs.com/class/lib/query-interface.js~QueryInterface.html
 */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('meters', {
      mid: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      balanceAmount: Sequelize.DECIMAL(10, 3),
      hoardingLimit: Sequelize.INTEGER,
      lastMonth: Sequelize.DECIMAL(10, 2),
      lastReadTime: Sequelize.DATE,
      meterValue: Sequelize.DECIMAL(10, 2),
      overdraftLimit: Sequelize.TINYINT,
      overdraftMoney: Sequelize.TINYINT,
      rKV: Sequelize.INTEGER,
      rMA: Sequelize.INTEGER,
      rPrice: Sequelize.DECIMAL(10, 2),
      rTotalCharge: Sequelize.DECIMAL(10, 2),
      switchState: Sequelize.STRING(50),
      thisMonth: Sequelize.DECIMAL(10, 2)
    })
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('meters')
  }
}
