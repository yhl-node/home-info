/* jshint indent: 2 */
import { Sequelize, DataTypes as DataType } from 'sequelize'

function MetersUpdateLogModel (sequelize: Sequelize, DataTypes: typeof DataType) {
  return sequelize.define('meters_update_log', {
    mid: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false
    },
    balanceAmount: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      defaultValue: '0.000'
    },
    hoardingLimit: {
      type: DataTypes.INTEGER,
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
    diffMeter: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    overdraftLimit: {
      type: DataTypes.INTEGER({ length: 4 }),
      allowNull: true
    },
    overdraftMoney: {
      type: DataTypes.INTEGER({ length: 4 }),
      allowNull: true
    },
    rKV: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    rMA: {
      type: DataTypes.INTEGER,
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
    tableName: 'meters_update_log'
  })
}

export default MetersUpdateLogModel
