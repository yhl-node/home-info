/*
 * @Author: yhl, yhl@1024hw.org
 * @Date: 2018-07-31 20:29:33
 * @Last Modified by: yhl
 * @Last Modified time: 2021-05-14 16:15:37
 */

import axios from 'axios'
import querystring from 'querystring'
import moment from 'moment'

class User {
  uid: number
  apiUrl: string
  postData: { UserID: number, MType: string, time: number }

  constructor (uid: number, config: any) {
    this.uid = uid
    this.apiUrl = `${config.infoUrl}`
    this.postData = {
      UserID: this.uid,
      MType: 'U',
      time: moment().unix()
    }
  }

  async getUserMeter () {
    const postData = Object.assign(this.postData, {
      action: 'getuserMeter'
    })
    const result = await axios.post(this.apiUrl, querystring.stringify(postData))
    return result.data.Meters || null
  }

  async getUserInfo () {
    const postData = Object.assign(this.postData, {
      action: 'getuser'
    })
    const result = await axios.post(this.apiUrl, querystring.stringify(postData))
    return result.data.WxUser || null
  }
}

export default User
