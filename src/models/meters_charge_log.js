/* jshint indent: 2 */

function MetersChargeLogModel (sequelize, DataTypes) {
  return sequelize.define('meters_charge_log', {
    mid: {
      type: DataTypes.INTEGER(11),
      primaryKey: true,
      allowNull: false
    },
    meter_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    amount: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      defaultValue: '0.000'
    },
    chargeTime: {
      type: DataTypes.DATE,
      allowNull: true
    },
    quantity: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    remainAmount: {
      type: DataTypes.DECIMAL,
      allowNull: true
    }
  }, {
    tableName: 'meters_charge_log'
  })
}

export default MetersChargeLogModel
