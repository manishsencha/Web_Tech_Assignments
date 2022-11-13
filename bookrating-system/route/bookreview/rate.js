const Book = require("../../model/book");
const User = require("../../model/user");
const Rating = require("../../model/rating")
module.exports = async (req, res) => {
  try {

    console.log(req.body)
    const { userId, rating, bookId } = req.body;

    const user = await User.findOne({ email: userId })

    // console.log(books.some(e => e.name === book.name))

    const rate = await Rating.findOne({ bookId: bookId })
    if (rate.users.some(user => user.userId === user.id)) {
      // console.log(here)
      return res.status(405).json("Alreaded rated")
    }

    let newRating = ((parseFloat(rate.rating) * rate.users.length) + rating) / (rate.users.length + 1)

    console.log(newRating)
    let users = rate.users
    users.push({ userId: user.id, rating: rating })
    console.log("USERS : ", users)
    await Rating.updateOne({ bookId: bookId }, {
      $set: {
        rating: newRating,
        users: users
      }
    }).then(() => console.log("Update Success"))

    const testRate = await Rating.findOne({ bookId: bookId })
    console.log("TEST RATE : ", testRate)
    console.log("TEST RATE USERS : ", testRate.users)
    return res.status(201).json({
      rating: newRating,
      isUserRated: true,
      userRating: rating
    })
  } catch (error) {
    console.log(error)
    return res.status(500).send("Something went wrong!!")
  }
};
