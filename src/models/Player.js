const mongoose = require('mongoose');
const {Schema} = mongoose.Schema();

const PlayerSchema = {
    name: {type: String},
    last_name: {type:String},
    phone: {type: String},
    user: {type: String}, 
    date: {type: Date, default: Date.now()}
}

module.exports = mongoose.model('Player', PlayerSchema);