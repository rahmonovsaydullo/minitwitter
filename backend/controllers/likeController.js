const pool = require("../config/db");

// Get all likes by the authenticated user
exports.getUserLikes = async (req, res) => {
  const { userId } = req.user;

  try {
    const { rows } = await pool.query(
      "SELECT post_id FROM likes WHERE user_id = $1 AND liked = true",
      [userId]
    );
    res.status(200).json(rows);
  } catch (error) {
    console.error("Error fetching user likes:", error.message);
    res.status(500).json({ error: "Failed to fetch user likes." });
  }
};

// Toggle like/unlike and return updated like count
exports.toggleLike = async (req, res) => {
  const { postId } = req.params;
  const { userId } = req.user;

  try {
    const { rows } = await pool.query(
      "SELECT * FROM likes WHERE post_id = $1 AND user_id = $2",
      [postId, userId]
    );

    let liked;

    if (rows.length > 0) {
      liked = !rows[0].liked;
      await pool.query(
        "UPDATE likes SET liked = $1 WHERE post_id = $2 AND user_id = $3",
        [liked, postId, userId]
      );
    } else {
      liked = true;
      await pool.query(
        "INSERT INTO likes (post_id, user_id, liked) VALUES ($1, $2, $3)",
        [postId, userId, liked]
      );
    }

    const likeCountRes = await pool.query(
      "SELECT COUNT(*) FROM likes WHERE post_id = $1 AND liked = true",
      [postId]
    );
    const likeCount = parseInt(likeCountRes.rows[0].count, 10);

    res.status(200).json({ liked, likeCount });
  } catch (error) {
    console.error("Toggle like error:", error.message);
    res.status(500).json({ error: "Failed to toggle like." });
  }
};
