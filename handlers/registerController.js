const { createNewUser } = require("../services/register/registerService");

const registerUser = async (req, res) => {
	if (!req.body) {
		return res.status(400).json({ message: "Request body is missing" });
	}
	const { username, password, email } = req.body;
	if (!username || !password || !email)
		return res.status(400).json({ message: "All fields required!" });

	try {
		const userData = { username, password, email };
		const createdUser = await createNewUser(userData);
		res
			.status(201)
			.json({ message: `${createdUser.username} account created.` });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

module.exports = { registerUser };
