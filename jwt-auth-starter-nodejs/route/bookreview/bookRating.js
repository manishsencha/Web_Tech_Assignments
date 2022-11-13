const Rating = require("../../model/rating")

module.exports = async (req, res) => {
    try {
        const { bookId } = req.params
        const rating = Rating.findOne({ bookId: bookId })
        return res.status(200).json({ rating: rating ? rating.rating ? rating.rating : 0 : 0 })
    } catch (error) {
        console.log(error)
        return res.status(500).json("Server Error")
    }
}