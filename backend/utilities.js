const jwt = require("jsonwebtoken");

const authenticationToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];

    if (!authHeader) {
        return res.status(401).json({ error: true, message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            console.log("Token verify error:", err);
            return res.status(403).json({ error: true, message: "Invalid token" });
        }
        req.user = user;
        next();
    });
};


module.exports = { authenticationToken };
