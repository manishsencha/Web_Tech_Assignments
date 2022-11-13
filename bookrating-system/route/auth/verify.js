const jwt = require('jsonwebtoken')

module.exports = async (req, res) => {
    const token = req.body.token || req.query.token || req.headers['x-access-token']
    if (!token) {
        return res.status(403).send("A token is required for authentication")
    }
    try {
        const decoded = jwt.verify(token, process.env.TOKEN_STRING)
        req.user = decoded
        return res.status(200).json(req.user)
    } catch (error) {
        return res.status(401).send("Invalid Token")
    }
}