const mongoose = require('mongoose');

const Creator = mongoose.model("Creator", {
    user: String,
    password: String
})

module.exports = Creator;