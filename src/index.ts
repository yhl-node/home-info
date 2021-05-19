/*
 * @Author: yhl, yhl@1024hw.org
 * @Date: 2018-08-18 17:23:34
 * @Last Modified by: yhl
 * @Last Modified time: 2021-05-14 16:28:14
 */
import config from 'config'
import updateMeter from './jobs/meter'
import updateUser from './jobs/user'
import updateUserMeter from './jobs/user_meter'
import updateCharge from './jobs/charge'

updateMeter()
console.log(config)

const interval = Number(config.get('interval.meter'))
setInterval(() => {
  console.log('updateMeter starting ................ ')
  updateMeter()
  console.log('updateMeter ending ................ ')
}, interval * 60 * 1000)

setInterval(() => {
  console.log('updateUser starting ................ ')
  updateCharge()
  console.log('updateUser ending ................ ')
}, interval * 60 * 1000)

setInterval(() => {
  console.log('updateUser starting ................ ')
  updateUser()
  console.log('updateUser ending ................ ')
}, interval * 60 * 1000)

setInterval(() => {
  console.log('updateUserMeter starting ................ ')
  updateUserMeter()
  console.log('updateUserMeter ending ................ ')
}, interval * 60 * 1000)
