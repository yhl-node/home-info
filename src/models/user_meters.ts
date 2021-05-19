/* jshint indent: 2 */
import { Sequelize, Model, DataTypes as DataType } from 'sequelize'

interface Attributes extends Model{
  mid: number;
  balanceAmount: number;
  meterValue: number
}

function UserMetersModel (sequelize: Sequelize, DataTypes: typeof DataType) {
  return sequelize.define<Attributes>('user_meters', {
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
      type: DataTypes.INTEGER({ length: 4 }),
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
}

export default UserMetersModel
