/*
 * @Author: yhl, yhl@1024hw.org
 * @Date: 2018-07-31 19:43:30
 * @Last Modified by: yhl
 * @Last Modified time: 2018-07-31 20:32:56
 */
const axios = require('axios')
const querystring = require('querystring')
const moment = require('moment')

class Meter {
  constructor (mid, config) {
    this.mid = mid
    this.apiUrl = `${config.infoUrl}`
  }
  async getMeterInfo () {
    let postData = {
      'action': 'getmeteractinfo',
      'mid': this.mid,
      'time': moment().unix()
    }
    let result = await axios.post(this.apiUrl, querystring.stringify(postData))
    return result.data.meterAct || null
  }
}

module.exports = Meter
