require('dotenv').config();  // Load environment variables

const pool = require("../config/db");
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");

exports.signup = async (req, res) => {
    try {
        const { name, username, password } = req.body;
        const profile_picture = req.file;

        // Check if username exists   
        const test = await pool.query(`SELECT * FROM users WHERE username = $1 LIMIT 1`, [username]);
        if (test.rows.length > 0) {
            return res.status(409).json({ message: "Username already exists" });
        }

        // Hash password 
        const salt = await bcrypt.genSalt(10);
        const encryptedPassword = await bcrypt.hash(password, salt);

        // Insert user into database
        const result = await pool.query(
            `INSERT INTO users(name, username, password, profile_picture) 
             VALUES ($1, $2, $3, $4) RETURNING *`,
            [name, username, encryptedPassword, profile_picture.filename]
        );
        

        res.json(result.rows)
        // Remove password from response
        const { password: _, ...userData } = result.rows[0];

        return res.status(201).json(userData);
    } catch (error) {
        console.error("Signup error:", error);
        return res.status(500).json({ message: "Server error during signup" + error });
    }
};

exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;
        
        // Check if user exists
        const result = await pool.query(`SELECT * FROM users WHERE username = $1 LIMIT 1`, [username]);
        if (result.rows.length === 0) {
            return res.status(404).json({ message: "Incorrect username or password" });
        }

        const user = result.rows[0];
        console.log("Input Password (plain):", password);
        console.log("Hashed Password from DB:", user.password);        
        console.log("User from DB:", result.rows[0]);




        // Check if password is valid
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            return res.status(404).json({ message: "Incorrect username or password" });
        }

        // Generate JWT token
        const token = jwt.sign(
            {
                userId: user.id,
                userName: user.username,
            },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        // Return success response
        return res.status(200).json({ user, token });

    } catch (error) {
        console.error("Login error:", error);
        return res.status(500).json({ message: "Server error during login" });
    }
};
