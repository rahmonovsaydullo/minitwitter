const pool = require('../config/db');

exports.allPosts = async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT posts.id, posts.text, posts.post_img, posts.created_at, 
                   users.username, users.profile_picture
            FROM posts
            JOIN users ON posts.user_id = users.id
            ORDER BY posts.created_at DESC;
        `);

        const posts = result.rows.map(post => ({
            ...post,
            post_img: post.post_img 
                ? `http://localhost:3000/uploads/${post.post_img}` 
                : null,
            profile_picture: post.profile_picture 
                ? `http://localhost:3000/uploads/${post.profile_picture}` 
                : null
        }));

        res.status(200).json(posts);
    } catch (error) {
        console.error("⚠️ Error fetching posts:", error);
        res.status(500).json({ message: "Server error fetching posts" });
    }
};

// ✅ Get my posts
exports.myPosts = async (req, res) => {
    try {
        const id = req.params.id;
        const result = await pool.query(
            `SELECT * FROM posts WHERE user_id = $1 ORDER BY created_at DESC`, 
            [id]
        );

        const posts = result.rows.map(post => ({
            ...post,
            post_img: post.post_img 
                ? `http://localhost:3000/uploads/${post.post_img}` 
                : null
        }));

        res.status(200).json(posts);
    } catch (error) {
        console.error("⚠️ Error fetching user's posts:", error);
        res.status(500).json({ message: "Server error fetching user's posts" });
    }
};


exports.postPosts = async (req, res) => {
    try {
        console.log("🔍 Extracted User from Token:", req.user); // ✅ Debugging User
        
        const userId = req.user.id;  // ⚠️ If `req.user` is undefined, userId will be undefined
        const { text } = req.body;

        if (!userId) {
            return res.status(401).json({ message: "Unauthorized: Invalid or missing token" });
        }

        if (!text) {
            return res.status(400).json({ message: "Text is required" });
        }

        const result = await pool.query(
            `INSERT INTO posts (user_id, text) 
            VALUES ($1, $2) RETURNING *;`,
            [userId, text, post_img]
        );
        const newPost = result.rows[0];
        res.status(201).json(newPost);
    } catch (error) {
        console.error("⚠️ Error creating post:", error);
        res.status(500).json({ message: "Server error creating post" });
    }
};



// ✅ Delete a post
exports.deletePosts = async (req, res) => {
    try {
        const { id } = req.params;

        const checkPost = await pool.query(
            "SELECT * FROM posts WHERE id = $1", 
            [id]
        );

        if (checkPost.rows.length === 0) {
            return res.status(404).json({ message: "Post not found" });
        }

        await pool.query("DELETE FROM posts WHERE id = $1", [id]);
        res.status(200).json({ message: "✅ Post deleted successfully" });
    } catch (error) {
        console.error("⚠️ Error deleting post:", error);
        res.status(500).json({ message: "Server error deleting post" });
    }
};
