require('dotenv').config();  // Load environment variables

const pool = require("../config/db");
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");

exports.signup = async (req, res) => {
    try {
        const { first_name, user_name, password } = req.body;
        const profile_picture = req.file;

        // Check if all fields are provided
        if (!first_name || !user_name || !password || !profile_picture || !profile_picture.filename) {
            return res.status(400).json({ message: "All fields including profile photo are required" });
        }

        // Check if username exists
        const test = await pool.query(`SELECT * FROM users WHERE user_name = $1 LIMIT 1`, [user_name]);
        if (test.rows.length > 0) {
            return res.status(409).json({ message: "Username already exists" });
        }

        // Hash password 
        const salt = await bcrypt.genSalt(10);
        const encryptedPassword = await bcrypt.hash(password, salt);

        // Insert user into database
        const result = await pool.query(
            `INSERT INTO users(first_name, user_name, password, profile_picture) 
             VALUES ($1, $2, $3, $4) RETURNING *`,
            [first_name, user_name, encryptedPassword, profile_picture.filename]
        );

        // Remove password from response
        const { password: _, ...userData } = result.rows[0];

        return res.status(201).json(userData);
    } catch (error) {
        console.error("Signup error:", error);
        return res.status(500).json({ message: "Server error during signup" });
    }
};

exports.login = async (req, res) => {
    try {
        const { user_name, password } = req.body;

        // Check if user exists
        const result = await pool.query(`SELECT * FROM users WHERE user_name = $1 LIMIT 1`, [user_name]);
        if (result.rows.length === 0) {
            return res.status(404).json({ message: "Invalid credentials" });
        }

        const user = result.rows[0];

        // Check if password is valid
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            return res.status(404).json({ message: "Invalid credentials" });
        }

        // Generate JWT token
        const token = jwt.sign(
            {
                userId: user.id,
                userName: user.user_name,  // Corrected from `user.name`
            },
            process.env.JWT_SECRET,  // Use environment variable for security
            { expiresIn: '3m' }
        );

        // Return success response
        return res.status(200).json({ user, token });

    } catch (error) {
        console.error("Login error:", error);
        return res.status(500).json({ message: "Server error during login" });
    }
};
