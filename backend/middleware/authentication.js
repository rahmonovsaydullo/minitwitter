const jwt = require("jsonwebtoken");

exports.authentication = (req, res, next) => {
    const authHeader = req.headers.authorization;
    
    console.log("🔍 Received Authorization Header:", authHeader); // ✅ Log the entire header

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Unauthorized: Invalid or missing token" });
    }

    const token = authHeader.split(" ")[1]; 
    console.log("🔍 Extracted Token:", token); // ✅ Log extracted token

    jwt.verify(token, "MY_SUPER_SECRET_KEY_987654321", (err, decoded) => {
        if (err) {
            console.log("❌ JWT Verification Error:", err.message);
            return res.status(401).json({ message: "Unauthorized: Invalid or expired token" });
        }

        console.log("✅ Token Verified. User:", decoded);
        req.user = decoded;
        next();
    });
};
