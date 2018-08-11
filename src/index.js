require('dotenv').config()
const helper = require('./jobs/helper')
const updateMeter = require('./jobs/meter')
const updateUser = require('./jobs/user')
const updateUserMeter = require('./jobs/user_meter')

Promise.all([
  updateUser(),
  updateUserMeter(),
  updateMeter()
]).then(() => { helper.db.close() })
