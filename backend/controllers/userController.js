const pool = require("../config/db");
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken")

exports.signup = async (req, res) => {
    try {
        const { first_name, user_name, password } = req.body;
        const test = await pool.query(
            `SELECT * FROM users WHERE user_name = $1 LIMIT 1`, [user_name]
        );

        if (test.rows.length > 0) return res.status(401).json({ message: "Username already exists" })

        const salt = await bcrypt.genSalt(10)
        const encryptedPassword = await bcrypt.hash(password, salt)
        const result  = await pool.query(
            `INSERT INTO users(first_name, user_name, password) VALUES ($1, $2, $3, $4) RETURNING *`, [first_name, user_name, encryptedPassword]
        )

    } catch (error) {
        console.log(error);
        res.send(500).json("Something is wrong in UserController.")

    }
}