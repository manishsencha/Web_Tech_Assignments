const bcrypt = require('bcryptjs')
const User = require('../../model/user')
const jwt = require('jsonwebtoken')

module.exports = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({ email: email })
        if (user) {
            const verification = await bcrypt.compare(password, user.password);
            if (verification) {
                const token = jwt.sign(
                    {
                        user_id: user._id,
                        email
                    },
                    process.env.TOKEN_STRING,
                    {
                        expiresIn: "1d"
                    }
                )
                const response_object = { firstName: user.first_name, lastName: user.last_name, email: user.email, token }
                // console.log("RESP : " + response_object)
                return res.status(200).json(response_object)
            }
            return res.status(400).json("Invalid password")
        }
        return res.status(400).json("Invalid email")
    } catch (error) {
        console.log(error)
        return res.status(500).json("Server Error")
    }
}