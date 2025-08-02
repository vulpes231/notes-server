const User = require("../../models/User");
const bcrypt = require("bcryptjs");

async function createNewUser(userData) {
	const { username, password, email } = userData;
	if (!username || !password || !email) throw new Error("All fields required!");
	try {
		const userExists = await User.findOne({ username });
		if (userExists) {
			throw new Error("Username taken!");
		}

		const emailExists = await User.findOne({ email });
		if (emailExists) {
			throw new Error("Email taken!");
		}

		const passwordHash = await bcrypt.hash(password, 10);

		const newUser = await User.create({
			username,
			email,
			password: passwordHash,
		});

		return newUser;
	} catch (error) {
		console.log(error);
		throw error;
	}
}

module.exports = { createNewUser };
