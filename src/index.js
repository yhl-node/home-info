import config from 'config'
import updateMeter from './jobs/meter'
import updateUser from './jobs/user'
import updateUserMeter from './jobs/user_meter'

updateMeter()
console.log(config)
setInterval(() => {
  console.log('updateMeter starting ................ ')
  updateMeter()
  console.log('updateMeter ending ................ ')
}, config.interval.meter * 60 * 1000)

setInterval(() => {
  console.log('updateUser starting ................ ')
  updateUser()
  console.log('updateUser ending ................ ')
}, config.interval.user * 60 * 1000)

setInterval(() => {
  console.log('updateUserMeter starting ................ ')
  updateUserMeter()
  console.log('updateUserMeter ending ................ ')
}, config.interval.userMeter * 60 * 1000)
