const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../../models/User");

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;

async function authUser(userData) {
	const { username, password } = userData;
	try {
		const user = await User.findOne({ username });
		if (!user) {
			throw new Error("User does not exist!");
		}

		const isPassword = await bcrypt.compare(password, user.password);
		if (!isPassword) {
			throw new Error("Invalid username or password!");
		}

		const accessToken = jwt.sign(
			{ username: user.username, userId: user._id },
			ACCESS_TOKEN_SECRET,
			{ expiresIn: "1d" }
		);

		const refreshToken = jwt.sign(
			{ username: user.username, userId: user._id },
			REFRESH_TOKEN_SECRET,
			{ expiresIn: "7d" }
		);
		user.refreshToken = refreshToken;
		await user.save();

		return { accessToken, refreshToken };
	} catch (error) {
		console.log(error);
		throw error;
	}
}

module.exports = { authUser };
