const mongoose = require('mongoose');

const accountSchema = mongoose.Schema({
    username : {type: String, require: true},
    password : {type: String, require: true},
    fullname: {type: String, require: true},
    email: {type: String, require: true},
    address : {type: String, require: true},
    phoneNumber: {type: String, require: true},
    role: {type: String, require: true},
    status: {type: Boolean, require: true}
}, {
    timestamps: true
});

module.exports = mongoose.model('Account', accountSchema);