var request = require('request');

function getUser($user_id) {
    JSON.parse()
}

request.post({
    url:'http://www.dzwyfwzx.com/Service/PhoneAPI.ashx',
    form: {
        action : 'getuser',
        UserID : 1549,
        MType : 'U',
        time : 1501217123
    }}, 
    function(error, response, body) {
        console.log('error:', error);
        console.log('statusCode:', response && response.statusCode);
        console.log('body:', body);
    }
);