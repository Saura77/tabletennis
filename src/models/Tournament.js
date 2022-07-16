const moongose = require("mongoose");
const {Schema} = moongose;

const TournamentSchema = {
    begin_date: {type: Date},
    duration: {type: String},
    categoria: {type: String},
    date: {type: Date, default: Date.now}
}

module.exports = moongose.model('Tournament', TournamentSchema);