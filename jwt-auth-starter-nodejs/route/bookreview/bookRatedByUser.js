const Rating = require("../../model/rating")

module.exports = async (req, res) => {
    try {

        const { bookId, userId } = req.params
        const rating = await Rating.findOne({ bookId: bookId });
        if (rating) {
            const userRating = rating.users.find(user => user.userId == userId)
            if (userRating) {
                return res.status(200).json({ rating: rating.rating ? rating.rating : 0, userRating: userRating, isUserRated: true })
            }
            else {
                return res.status(200).json({ rating: rating.rating ? rating.rating : 0, userRating: 0, isUserRated: false })
            }
        }
        else {
            return res.status(200).json({ rating: 0, userRating: 0, isUserRated: false })
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json("Server Error")
    }
}