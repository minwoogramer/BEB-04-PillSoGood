const { model, Schema } = require('mongoose');

const user = new Schema({
    name : String
})

module.exports = model('User', user); // user스키마를 User라는 이름으로 export