const mongoose = require('mongoose');

const Education = mongoose.model("Education",{
    story: Array,
    upvote: Number,
    like: Boolean,
    book: Boolean,
    user: String
})

module.exports = Education;