/* jshint indent: 2 */

import { Sequelize, Model, DataTypes as DataType } from 'sequelize'

interface Attributes extends Model {
  mid: number;
  balanceAmount: number;
  meterValue: number
}

function MetersModel (sequelize: Sequelize, DataTypes: typeof DataType) {
  return sequelize.define<Attributes>('meters', {
    mid: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true },
    balanceAmount: { type: DataTypes.DECIMAL, allowNull: false, defaultValue: '0.000' },
    hoardingLimit: { type: DataTypes.INTEGER, allowNull: false },
    lastMonth: { type: DataTypes.DECIMAL, allowNull: false },
    lastReadTime: { type: DataTypes.DATE, allowNull: true },
    meterValue: { type: DataTypes.DECIMAL, allowNull: true },
    overdraftLimit: { type: DataTypes.INTEGER({ length: 4 }), allowNull: true },
    overdraftMoney: { type: DataTypes.INTEGER({ length: 4 }), allowNull: true },
    rKV: { type: DataTypes.INTEGER, allowNull: true },
    rMA: { type: DataTypes.INTEGER, allowNull: true },
    rPrice: { type: DataTypes.DECIMAL, allowNull: true },
    rTotalCharge: { type: DataTypes.DECIMAL, allowNull: true },
    switchState: { type: DataTypes.STRING(50), allowNull: true },
    thisMonth: { type: DataTypes.DECIMAL, allowNull: true }
  }, {
    tableName: 'meters'
  })
}

export default MetersModel
