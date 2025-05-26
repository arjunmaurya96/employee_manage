const jwt = require('jsonwebtoken');
const ensureAuthenticated = (req, res, next) => {
    let auth = req.headers['authorization'];

    if (!auth) {
        return res.status(403).json({ message: "Unauthorized , JWT token is require " });
    }
    try {
        auth = auth.split(' ')[1]
        const decoded = jwt.verify(auth, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(403).json({ message: "Unauthorized , JWT token wrong or expired " });
    }
}

// const ensureAuthenticated = async (req, res, next) => {
//     try {
//         const authHeader = req.headers.authorization;

//         if (!authHeader || !authHeader.startsWith("Bearer ")) {
//             return res.status(401).json({ message: "No token provided" });
//         }

//         const token = authHeader.split(" ")[1];
//         const decoded = jwt.verify(token, "your_jwt_secret"); // Use your secret key

//         const user = await loginData.findById(decoded.id); // token should contain user id
//         if (!user) return res.status(404).json({ message: "User not found" });

//         req.user = user;
//         next();
//     } catch (err) {
//         console.error("Auth error:", err);
//         res.status(401).json({ message: "Unauthorized" });
//     }
// };


module.exports = ensureAuthenticated;