const moongose = require("mongoose");
const {Schema} = moongose;

const ClubSchema = {
    name: {type: String},
    phone: {type: String},
    user: {type: String},
    date: {type: Date, default: Date.now}
}

module.exports = moongose.model('Club', ClubSchema);