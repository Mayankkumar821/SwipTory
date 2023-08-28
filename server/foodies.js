const mongoose = require('mongoose');

const Food = mongoose.model("Food",{
    user: String,
    story: Array,
    upvote: Number,
    like: Boolean,
    book: Boolean
})

module.exports = Food;