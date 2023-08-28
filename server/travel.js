const mongoose = require('mongoose');

const Travel = mongoose.model("Travel",{
    story: Array,
    upvote: Number,
    like: Boolean,
    book: Boolean,
    user: String
})

module.exports = Travel;