const express = require('express')
const cors = require('cors')
const signin = require('./route/auth/signin')
const signup = require("./route/auth/signup")
const auth = require('./middleware/auth')
const protected = require('./route/protectedroutes/protected')
const rate = require('./route/bookreview/rate')
const verify = require('./route/auth/verify')
const books = require('./route/bookreview/books')
const image = require('./route/bookreview/image')
const bookRating = require('./route/bookreview/bookRating')
const bookRatedByUser = require('./route/bookreview/bookRatedByUser')
const app = express()

require('dotenv').config()

// Connect to database
require('./config/database').connect()

const PORT = process.env.PORT || 5000;

app.use(express.json())
app.use(cors())
app.post("/signup", signup)
app.post("/signin", signin)
app.get('/verify', verify)
app.get("/protected", auth, protected);
app.post("/rate", auth, rate)
app.get("/books/:userId/:tab", auth, books)
app.get("/image/:bookName", auth, image)

app.listen(PORT, () => console.log(`Server started : http://localhost:${PORT}`))
