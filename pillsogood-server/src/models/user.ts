const { model, Schema, Types } = require('mongoose');

const user = new Schema({
    nickname: String,
    email: String,
    dateOfBirth: String,
    password: String,
    pointBalance: Number,
    createdAt: String
})

module.exports = model('User', user); // user스키마를 User라는 이름으로 export