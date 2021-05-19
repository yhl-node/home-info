/* jshint indent: 2 */
import { Sequelize, ModelDefined, Optional, DataTypes as DataType } from 'sequelize';

interface Attributes {
  mid: number;
  balanceAmount: number;
  meterValue: number
}

interface CreationAttributes extends Optional<Attributes, 'mid' | 'balanceAmount' | 'meterValue'> {};

function UserMetersModel (sequelize: Sequelize, DataTypes: typeof DataType) {
  const model: ModelDefined<Attributes, CreationAttributes> = sequelize.define('user_meters', {
    mid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    installtime: {
      type: DataTypes.DATE,
      allowNull: true
    },
    location: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    meternumber: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    onlineflag: {
      type: DataTypes.INTEGER({length: 4}),
      allowNull: true
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    type: {
      type: DataTypes.STRING(50),
      allowNull: true
    }
  }, {
    tableName: 'user_meters'
  })
  return model
}

export default UserMetersModel
