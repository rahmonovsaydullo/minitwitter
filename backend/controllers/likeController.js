const pool = require('../config/db');

exports.toggleLike = async (req, res) => {
  const { postId } = req.params;
  const { userId } = req.body;

  try {
    // Check if the like already exists
    const { rows } = await pool.query(
      'SELECT * FROM likes WHERE post_id = $1 AND user_id = $2',
      [postId, userId]
    );

    if (rows.length > 0) {
      // Unlike
      await pool.query(
        'DELETE FROM likes WHERE post_id = $1 AND user_id = $2',
        [postId, userId]
      );
      return res.status(200).json({ liked: false });
    } else {
      // Like
      await pool.query(
        'INSERT INTO likes (post_id, user_id) VALUES ($1, $2)',
        [postId, userId]
      );
      return res.status(200).json({ liked: true });
    }
  } catch (error) {
    console.error('Toggle like error:', error.message);
    res.status(500).json({ error: 'Failed to toggle like.' });
  }
};
