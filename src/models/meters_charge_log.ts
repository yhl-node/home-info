/* jshint indent: 2 */
import { Sequelize, ModelDefined, DataTypes as DataType } from 'sequelize';

function MetersChargeLogModel (sequelize: Sequelize, DataTypes: typeof DataType) {
  return sequelize.define('meters_charge_log', {
    mid: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false
    },
    meter_id: {
      type: DataTypes.INTEGER,
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
