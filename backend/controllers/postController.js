const pool = require('../config/db')

exports.myPosts = async (req, res) => {
    try {
        const id = req.params.id
        const result = await pool.query('SELECT * FROM posts WHERE user_id = $1', [id])
        const posts = result.rows.map(post => {
            return { ...post, url: 'http://localhost:3000/' + post.filepath }
        })
        result.status(200).json(posts)
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong with posts controller" })

    }
}

exports.allPosts = async (req, res) => {
    try {
        const { id } = req.query
        const result = await pool.query(`
            SELECT posts.id, posts.text, posts.post_img, posts.created_at, users.username, users.profile_picture
            FROM posts
            JOIN users ON posts.user_id = users.id
            ORDER BY posts.created_at DESC;
            `, [id])
        const posts = result.rows.map(post => {
            return { ...post, url: 'http://localhost:3000/' + post }
        })
        res.status(200).json(posts)
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong with  allposts controller" })
    }
}

exports.deletePosts = async (req, res) => {
    try {
        const { id } = req.params
        await pool.query("DELETE FROM posts WHERE id = $1", [id])
        res.status(200).json({ message: "Post deleted" })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong with  delete posts controller" })
    }
}

exports.postPosts = async () => {
    try {

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server with post posts" })
    }
}