const pool = require("../config/db");
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken")

exports.signup = async (req, res) => {
    try {
        const { first_name, user_name, password } = req.body;
        const test = await pool.query(`SELECT * FROM users WHERE user_name = $1 LIMIT 1`, [user_name]);
        // Checking username
        if (test.rows.length > 0) return res.status(401).json({ message: "Username already exists" })

        // Hashing password 
        const salt = await bcrypt.genSalt(10)
        const encryptedPassword = await bcrypt.hash(password, salt)
        // Insert into 
        const result = await pool.query(`INSERT INTO users(first_name, user_name, password) VALUES ($1, $2, $3, $4) RETURNING *`, [first_name, user_name, encryptedPassword])
        res.json(result.rows)
    } catch (error) {
        console.log(error);
        res.send(500).json("Something is wrong in UserController.")
    }
}


exports.login = async (req, res) => {
    try {
        const { user_name, password } = req.body
        const result = await pool.query(`SELECT * FROM users WHERE user_name = $1 LIMIT 1`, [user_name])

        // Check username and password
        if (result.rows.length === 0) res.status(404).json({ message: "Invalid credentials" })

        // Checking password with bcrypt
        const user = result.rows[0]
        const isValidPassword = await bcrypt.compare(password, user.password)

        // Checking the password
        if (!isValidPassword) res.status(404).json({ message: "Invalid credentials" })


        // Token generate 
        const token = jwt.sign(
            {
                userId: user.id,
                userName: user.name
            },

            "this secret key expires in 3 minutes",
            { expiresIn: '3m' }
        );

        // If user_name and password are correct 
        res.status(200).json({ user, token })

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something is wrong in UserController. " })
    }
}