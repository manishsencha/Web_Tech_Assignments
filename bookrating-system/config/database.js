const mongoose = require('mongoose')
const Book = require('../model/book')
const Rating = require('../model/rating')
const books = require("./books.json")

exports.connect = () => {
    mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
        .then(async () => {
            console.log("CONNECTED TO DATABASE...")
            // await Book.remove().then(() => console.log("Deleted all books"))
            // await Rating.remove().then(() => console.log("Deleted all rating"))
            // await Book.insertMany(books).then(() => console.log("Added books"))
            // const insertedBooks = await Book.find({})
            // insertedBooks.forEach(async book => {
            //     await Rating.create({ bookId: book.id, rating: 0, users: [] })
            // })
        })
        .catch((error) => {
            console.log("FAILED TO CONNECT TO DATABASE")
            console.error(error)
        })
}