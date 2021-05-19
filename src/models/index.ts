
import { Sequelize, DataTypes } from 'sequelize'
import config from 'config'
import userDefine from './users'
import meterDefine from './meters'
import userMeterDefine from './user_meters'
import meterChargeLogDefine from './meters_charge_log'
import meterUpdateLogDefine from './meters_update_log'

const sequelize = new Sequelize({
  host: config.get('mysql.host'),
  username: config.get('mysql.user'),
  password: config.get('mysql.pwd'),
  database: config.get('mysql.db'),
  dialect: 'mysql',
  define: { timestamps: false },
  logging: false
})

const models = {
  User: userDefine(sequelize, DataTypes),
  MeterChargeLog: meterChargeLogDefine(sequelize, DataTypes),
  MeterUpdateLog: meterUpdateLogDefine(sequelize, DataTypes),
  Meter: meterDefine(sequelize, DataTypes),
  UserMeter: userMeterDefine(sequelize, DataTypes)
}

export default { sequelize, models }
