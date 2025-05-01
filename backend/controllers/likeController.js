const pool = require("../config/db");

// Get the list of liked posts for a user
exports.getUserLikes = async (req, res) => {
  const { userId } = req.user; // The user ID comes from JWT token
  
  try {
    const { rows } = await pool.query(
      "SELECT * FROM likes WHERE user_id = $1",
      [userId]
    );
    res.status(200).json(rows);  // Sends back the list of liked posts for the user
  } catch (error) {
    console.error("Error fetching user likes:", error.message);
    res.status(500).json({ error: "Failed to fetch user likes." });
  }
};

// Toggle like for a post (like/unlike)
exports.toggleLike = async (req, res) => {
  const { postId } = req.params;
  const { userId } = req.user; // Get userId from JWT token

  try {
    // Check if the like already exists for this post and user
    const { rows } = await pool.query(
      'SELECT * FROM likes WHERE post_id = $1 AND user_id = $2',
      [postId, userId]
    );

    if (rows.length > 0) {
      // Toggle the liked status
      const newLikedStatus = rows[0].liked ? false : true;
      await pool.query(
        'UPDATE likes SET liked = $1 WHERE post_id = $2 AND user_id = $3',
        [newLikedStatus, postId, userId]
      );
      return res.status(200).json({ liked: newLikedStatus });
    } else {
      // If no like exists, add a new like with status true
      await pool.query(
        'INSERT INTO likes (post_id, user_id, liked) VALUES ($1, $2, $3)',
        [postId, userId, true]
      );
      return res.status(200).json({ liked: true });
    }
  } catch (error) {
    console.error('Toggle like error:', error.message);
    res.status(500).json({ error: 'Failed to toggle like.' });
  }
};
