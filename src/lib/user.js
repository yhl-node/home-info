/*
 * @Author: yhl, yhl@1024hw.org
 * @Date: 2018-07-31 20:29:33
 * @Last Modified by: yhl
 * @Last Modified time: 2018-07-31 20:43:01
 */

const axios = require('axios')
const querystring = require('querystring')
const moment = require('moment')

class User {
  constructor (uid, config) {
    this.uid = uid
    this.apiUrl = `${config.infoUrl}`
    this.postData = {
      'UserID': this.uid,
      'MType': 'U',
      'time': moment().unix()
    }
  }
  async getUserMeter () {
    let postData = Object.assign(this.postData, {
      'action': 'getuserMeter'
    })
    let result = await axios.post(this.apiUrl, querystring.stringify(postData))
    return result.data.Meters || null
  }

  async getUserInfo () {
    let postData = Object.assign(this.postData, {
      'action': 'getuser'
    })
    let result = await axios.post(this.apiUrl, querystring.stringify(postData))
    return result.data.WxUser || null
  }
}

module.exports = User
