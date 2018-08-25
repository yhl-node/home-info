/*
 * @Author: yhl, yhl@1024hw.org
 * @Date: 2018-08-18 17:23:34
 * @Last Modified by: yhl
 * @Last Modified time: 2018-08-25 15:10:35
 */
import config from 'config'
import updateMeter from './jobs/meter'
import updateUser from './jobs/user'
import updateUserMeter from './jobs/user_meter'
import updateCharge from './jobs/charge'

updateMeter()
console.log(config)
setInterval(() => {
  console.log('updateMeter starting ................ ')
  updateMeter()
  console.log('updateMeter ending ................ ')
}, config.interval.meter * 60 * 1000)

setInterval(() => {
  console.log('updateUser starting ................ ')
  updateCharge()
  console.log('updateUser ending ................ ')
}, config.interval.charge * 60 * 1000)

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
