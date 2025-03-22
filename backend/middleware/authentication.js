const jwt = require("jsonwebtoken")

exports.authentication = async (req, res, next) => {
    try {
        const token = req.header("Authorization")?.split(" ")[1]

        if (!token) res.status(401).json({ message: "Token not given " })

        const check = jwt.verify(
            token,
            "The secret key word"
        );
        next()
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error in authentication' })

    }
}