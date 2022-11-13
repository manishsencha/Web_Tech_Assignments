const mongoose = require("mongoose");

// {
//   "author": "Marguerite Yourcenar",
//   "imageLink": "images/memoirs-of-hadrian.jpg",
//   "link": "https://en.wikipedia.org/wiki/Memoirs_of_Hadrian\n",
//   "pages": 408,
//   "title": "Memoirs of Hadrian",
//   "year": 1951,
//   "rating": 0
// }

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  imageLink: {
    type: String
  },
  pages: {
    type: Number,
    default: 0
  },
  year: {
    type: Number,
    default: 1900
  },
  link: {
    type: String
  }
});

module.exports = mongoose.model("book", bookSchema);
