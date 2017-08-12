var request = require('request');
var {config} = require('../config/config.js');

function getUser($user_id) {
    var requestUri = config.BASE_URL . '/Service/PhoneAPI.ashx';
    var formData = {
        action : 'getuser',
        UserID : 1549,
        MType : 'U',
        time : 1501217123
    };
    request.post(
        {
            url: requestUri,
            form: formData
        }, function(error, response, body) {
            console.log('error:', error);
            console.log('statusCode:', response && response.statusCode);
            console.log('body:', body);
        }
    );
}

