var axios = require('axios')
var config = require('config')
const querystring = require('querystring')

async function start () {
  console.log(config.baseUrl)
  let url = `${config.baseUrl}/Service/PhoneAPI.ashx`
  let formData = {
    action: 'getuser',
    UserID: 1762,
    MType: 'U',
    time: 1501217123
  }
  let result = await axios.post(url, querystring.stringify(formData))
  console.log(result.data)
}

start()
