const mongoose = require('mongoose');

const LogSchema = mongoose.Schema({
    fromAddress: String,
    toAddress: String,
    amount: Number,

}, {
    timestamps: true
});

module.exports = mongoose.model('Log', LogSchema);