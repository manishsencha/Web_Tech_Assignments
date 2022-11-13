const path = require('path')
const fs = require('fs')
module.exports = (req, res) => {

    let file = fs.readFileSync(path.resolve(`images/${req.params.bookName}`)).toString('base64')
    return res.status(200).json(file)
}