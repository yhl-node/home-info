/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('meters', {
    mid: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    balanceAmount: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      defaultValue: '0.000'
    },
    hoardingLimit: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    lastMonth: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    lastReadTime: {
      type: DataTypes.DATE,
      allowNull: true
    },
    meterValue: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    overdraftLimit: {
      type: DataTypes.INTEGER(4),
      allowNull: true
    },
    overdraftMoney: {
      type: DataTypes.INTEGER(4),
      allowNull: true
    },
    rKV: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    rMA: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    rPrice: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    rTotalCharge: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    switchState: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    thisMonth: {
      type: DataTypes.DECIMAL,
      allowNull: true
    }
  }, {
    tableName: 'meters'
  })
}
