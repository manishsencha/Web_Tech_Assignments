const Book = require("../../model/book");
const User = require("../../model/user");

module.exports = async (req, res) => {
  try {
    const { userId, rating, bookId } = req.body;

    const user = await User.findOne({ id: userId });
    user.books.push({ bookId: bookId, rating: rating });
    user.save();
    return res.status(201).json("Success");
  } catch (error) {
    return res.status(500).send("Something went wrong!!");
  }
};
