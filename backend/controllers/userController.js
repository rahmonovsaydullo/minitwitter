require('dotenv').config();
const pool = require("../config/db");
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");


exports.signup = async (req, res) => {
    try {
        const { name, username, password } = req.body;
        const profile_picture = req.file ? req.file.filename : null;

        // Check if user exists
        const test = await pool.query(`SELECT * FROM users WHERE username = $1 LIMIT 1`, [username]);
        if (test.rows.length > 0) {
            return res.status(409).json({ message: "Username already exists" });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const encryptedPassword = await bcrypt.hash(password, salt);

        const result = await pool.query(
            `INSERT INTO users(name, username, password, profile_picture) 
             VALUES ($1, $2, $3, $4) RETURNING id, name, username, profile_picture`,
            [name, username, encryptedPassword, profile_picture]
        );

        let user = result.rows[0];
        if (user.profile_picture) {
            user.profile_picture = `http://localhost:3000/uploads/${user.profile_picture}`;
        }

        // ✅ Generate JWT token with correct userId
        const token = jwt.sign(
            { userId: user.id, username: user.username },
            "The secret of the secretness word of secret",
            { expiresIn: "1h" }
        );

        return res.status(201).json({ user, token });
    } catch (error) {
        console.error("Signup error:", error);
        return res.status(500).json({ message: "Server error during signup" });
    }
};


exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const result = await pool.query(`SELECT * FROM users WHERE username = $1 LIMIT 1`, [username]);
        if (result.rows.length === 0) {
            return res.status(404).json({ message: "Incorrect username or password" });
        }

        const user = result.rows[0];

        // Validate password
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            return res.status(401).json({ message: "Incorrect username or password" });
        }

        // Remove password from response
        delete user.password;

        // Convert filename to full URL
        if (user.profile_picture) {
            user.profile_picture = `http://localhost:3000/uploads/${user.profile_picture}`;
        }

        // Generate JWT token
        const token = jwt.sign(
            { userId: user.id, username: user.username },
            "The secret of the secretness word of secret",
            { expiresIn: "1h" }
        );
        console.log("Received Token:", token);


        return res.status(200).json({ user, token });
    } catch (error) {
        console.error("Login error:", error);
        return res.status(500).json({ message: "Server error during login" });
    }
};

exports.getUser = async (req, res) => {
    try {
        const { username } = req.params;
        const result = await pool.query("SELECT * FROM users WHERE username = $1", [username]);

        if (result.rows.length === 0) {
            return res.status(404).json({ message: "User not found" });
        }

        let user = result.rows[0];

        // Convert filename to full URL
        if (user.profile_picture) {
            user.profile_picture = `http://localhost:3000/uploads/${user.profile_picture}`;
        }

        res.json(user);
    } catch (error) {
        console.error("Error fetching user:", error);
        res.status(500).json({ message: "Server error" });
    }
};
