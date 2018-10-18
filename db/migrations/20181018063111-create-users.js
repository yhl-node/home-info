'use strict'
/**
 * http://docs.sequelizejs.com/class/lib/query-interface.js~QueryInterface.html
 */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('users', {
      user_id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      cName: Sequelize.STRING(50),
      iD: Sequelize.INTEGER,
      password: Sequelize.STRING(100),
      remark: Sequelize.STRING,
      sex: Sequelize.STRING(100),
      userName: Sequelize.STRING(50),
      wxID: Sequelize.STRING(50),
      phone: Sequelize.STRING(100)
    })
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('users')
  }
}
