const mongoose = require('mongoose');

const BookMark = mongoose.model("BookMark",{
    story: Array,
    upvote: Number,
    like: Boolean,
    book: Boolean
})

module.exports = BookMark;