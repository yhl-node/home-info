'use strict'
/**
 * http://docs.sequelizejs.com/class/lib/query-interface.js~QueryInterface.html
 */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('user_meters', {
      mid: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id: Sequelize.INTEGER,
      installtime: Sequelize.DATE,
      location: Sequelize.STRING(100),
      meternumber: Sequelize.INTEGER,
      onlineflag: Sequelize.TINYINT,
      price: Sequelize.DECIMAL(10, 2),
      type: Sequelize.STRING(50)
    })
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('user_meters')
  }
}
