/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('users', {
    user_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    cName: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    iD: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    password: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    phone: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    remark: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    sex: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    userName: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    wxID: {
      type: DataTypes.STRING(50),
      allowNull: true
    }
  }, {
    tableName: 'users'
  });
};
