const Book = require('../../model/book')
const Rating = require('../../model/rating')
const User = require('../../model/user')
module.exports = async (req, res) => {
    const { userId, tab } = req.params
    const books = await Book.find()

    const dbUser = await User.findOne({ email: userId })
    let start = 10 * (tab - 1), end = (10 * tab);
    let bookRange = []
    for (let i = start; i < end; ++i) {
        bookRange.push(books[i]);
    }
    let booksWithRating = []
    for (let book of bookRange) {
        let rating = await Rating.findOne({ bookId: book.id })
        // console.log(rating.users)
        let userRating = rating.users.find(user => user.userId === dbUser.id)

        // console.log(userRating)
        booksWithRating.push({ book, rating: rating.rating, userRating: userRating ? userRating.rating : 0, isUserRated: userRating ? true : false })
    }
    return res.status(200).json(booksWithRating)
}