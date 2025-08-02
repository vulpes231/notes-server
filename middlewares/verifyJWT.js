const jwt = require("jsonwebtoken");
require("dotenv").config();

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;

const verifyJWT = (req, res, next) => {
	const authHeader =
		req.headers["authorization"] || req.headers["Authorization"];
	if (!authHeader?.startsWith("Bearer ")) {
		return res
			.status(401)
			.json({ message: "Unauthorized - No token provided!" });
	}

	const token = authHeader.split(" ")[1];
	if (!token)
		return res.status(401).json({ message: "Unauthorized - Malformed token" });

	jwt.verify(token, ACCESS_TOKEN_SECRET, (err, decoded) => {
		if (err) return res.status(403).json({ message: "Forbidden access!" });
		req.user = {
			username: decoded.username,
			userId: decoded.userId,
		};
		next();
	});
};

module.exports = { verifyJWT };
