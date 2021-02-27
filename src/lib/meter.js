/*
 * @Author: yhl, yhl@1024hw.org
 * @Date: 2018-07-31 19:43:30
 * @Last Modified by: yhl
 * @Last Modified time: 2021-02-27 22:49:13
 */
import axios from 'axios'
import querystring from 'querystring'
import moment from 'moment'

class Meter {
  constructor (mid, config) {
    this.mid = mid
    this.apiUrl = `${config.infoUrl}`
  }

  async getMeterInfo () {
    const postData = {
      action: 'getmeteractinfo',
      mid: this.mid,
      time: moment().unix()
    }
    const result = await axios.post(this.apiUrl, querystring.stringify(postData))
    return result.data.meterAct || null
  }

  async getChargeInfo () {
    const postData = {
      action: 'getMeterCharge',
      mid: this.mid,
      time: moment().unix()
    }
    const result = await axios.post(this.apiUrl, querystring.stringify(postData))
    return result.data.Charges || null
  }
}

export default Meter
