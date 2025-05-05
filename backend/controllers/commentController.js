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

  
  // controllers/commentController.js


// POST /comments/:commentId/like
const likeComment = async (req, res) => {
  const commentId = parseInt(req.params.commentId);
  const userId = req.user.userId;

  try {
    await pool.query(
      "INSERT INTO comment_likes (comment_id, user_id) VALUES ($1, $2) ON CONFLICT DO NOTHING",
      [commentId, userId]
    );
    res.status(200).json({ message: "Comment liked." });
  } catch (error) {
    console.error("Error liking comment:", error);
    res.status(500).json({ error: "Failed to like comment" });
  }
};

// DELETE /comments/:commentId/unlike
const unlikeComment = async (req, res) => {
  const commentId = parseInt(req.params.commentId);
  const userId = req.user.userId;

  try {
    await pool.query(
      "DELETE FROM comment_likes WHERE comment_id = $1 AND user_id = $2",
      [commentId, userId]
    );
    res.status(200).json({ message: "Comment unliked." });
  } catch (error) {
    console.error("Error unliking comment:", error);
    res.status(500).json({ error: "Failed to unlike comment" });
  }
};

// GET /comments/:commentId/likes-count
const getCommentLikes = async (req, res) => {
  const commentId = parseInt(req.params.commentId);

  try {
    const result = await pool.query(
      "SELECT COUNT(*) FROM comment_likes WHERE comment_id = $1",
      [commentId]
    );
    res.status(200).json({ likes: parseInt(result.rows[0].count, 10) });
  } catch (error) {
    console.error("Error getting comment likes:", error);
    res.status(500).json({ error: "Failed to get comment likes" });
  }
};

module.exports = {
  getComments,
  createComment,
  likeComment,
  unlikeComment,
  getCommentLikes,
};


// module.exports = {
//   getComments,
//   createComment,
// };
