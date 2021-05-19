/* jshint indent: 2 */

import { Sequelize, ModelDefined, Optional, DataTypes as DataType } from 'sequelize';

interface Attributes {
  mid: number;
  balanceAmount: number;
  meterValue: number
}

interface CreationAttributes extends Optional<Attributes, 'mid' | 'balanceAmount' | 'meterValue'> {};

function MetersModel (sequelize: Sequelize, DataTypes: typeof DataType) {
  const model: ModelDefined<Attributes, CreationAttributes> =  sequelize.define('meters', {
    mid: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true },
    balanceAmount: { type: DataTypes.DECIMAL, allowNull: false, defaultValue: '0.000' },
    hoardingLimit: { type: DataTypes.INTEGER, allowNull: false },
    lastMonth: { type: DataTypes.DECIMAL, allowNull: false },
    lastReadTime: { type: DataTypes.DATE, allowNull: true },
    meterValue: { type: DataTypes.DECIMAL, allowNull: true },
    overdraftLimit: { type: DataTypes.INTEGER({length:4}), allowNull: true },
    overdraftMoney: { type: DataTypes.INTEGER({length: 4}), allowNull: true },
    rKV: { type: DataTypes.INTEGER, allowNull: true },
    rMA: { type: DataTypes.INTEGER, allowNull: true },
    rPrice: { type: DataTypes.DECIMAL, allowNull: true },
    rTotalCharge: { type: DataTypes.DECIMAL, allowNull: true },
    switchState: { type: DataTypes.STRING(50), allowNull: true },
    thisMonth: { type: DataTypes.DECIMAL, allowNull: true }
  }, {
    tableName: 'meters'
  })
  return model
}

export default MetersModel
