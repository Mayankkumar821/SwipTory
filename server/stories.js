const mongoose = require('mongoose');

const Story = mongoose.model("Story",{
    story: Array,
    upvote: Number,
    like: Boolean,
    book: Boolean,
    user: String,
    category: String
})

module.exports = Story;