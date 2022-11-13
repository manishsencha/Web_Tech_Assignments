const mongoose = require("mongoose")

const ratingSchema = new mongoose.Schema({
    bookId: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        default: 0
    },
    users: []
})

module.exports = mongoose.model("Rating", ratingSchema)