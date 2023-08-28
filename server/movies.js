const mongoose = require('mongoose');

const Movie = mongoose.model("Movie",{
    story: Array,
    upvote: Number,
    like: Boolean,
    book: Boolean,
    user: String
})

module.exports = Movie;