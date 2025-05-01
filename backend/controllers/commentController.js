// controllers/commentController.js
const pool = require("../config/db"); // Adjust path to match your project

// GET /posts/:postId/comments
const getComments = async (req, res) => {
  const postId = req.params.postId;

  try {
    const result = await pool.query(
      "SELECT c.id, c.text, u.username FROM comments c JOIN users u ON c.user_id = u.id WHERE c.post_id = $1 ORDER BY c.created_at ASC",
      [postId]
    );

    res.status(200).json(result.rows); // ✅ Send array of comments
  } catch (error) {
    console.error("Error fetching comments:", error);
    res.status(500).json({ error: "Failed to fetch comments" });
  }
};

// POST /posts/:postId/comments
const createComment = async (req, res) => {
  const postId = parseInt(req.params.postId);
  const { text } = req.body;
  const userId = req.user.userId; // ✅ Use userId if that's what's in token

  try {
    const result = await pool.query(
      "INSERT INTO comments (text, user_id, post_id) VALUES ($1, $2, $3) RETURNING *",
      [text, userId, postId]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Error creating comment:", error.stack);
    res.status(500).json({ error: "Failed to create comment" });
  }
};

  
  

module.exports = {
  getComments,
  createComment,
};
