const moongose = require("mongoose");
const {Schema} = moongose;

const ClubSchema = {
    name: {type: String},
    phone: {type: String},
    id_user: {type: String},
    date: {type: Date, default: Date.now}
}

module.exports = moongose.model('Club', ClubSchema);