// const jwt = require('jsonwebtoken');

// exports.authentication = async (req, res, next) => {
//   try {
//     const token = req.header("Authorization")?.split(" ")[1];
//     if (!token) {
//       return res.status(401).json({ message: "Token not given" });
//     }
//     const decoded = jwt.verify(
//       token,
//       "The secret of the secretness word of secret"
//     );
//     console.log("✅ Decoded token:", decoded); // Add this for debugging
//     req.user = decoded; // ✅ This must contain `id` (userId)
//     next();
//   } catch (error) {
//     return res.status(401).json({ message: error.message });
//   }
// };


const jwt = require('jsonwebtoken');

exports.authentication = async (req, res, next) => {
  try {
    const token = req.header("Authorization")?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Token not given" });
    }

    const decoded = jwt.verify(
      token,
      "The secret of the secretness word of secret"
    );

    console.log("✅ Decoded token:", decoded); // Add this for debugging

    req.user = decoded; // ✅ This must contain `id` (userId)
    next();
  } catch (error) {
    return res.status(401).json({ message: error.message });
  }
};
