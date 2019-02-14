const mongoose = require('mongoose');

const AccountSchema = mongoose.Schema({
    privateKey: String,
    address: String,
    balance: Number,

}, {
    timestamps: true
});

module.exports = mongoose.model('Account', AccountSchema);