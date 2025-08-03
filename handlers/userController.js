const {
	getUserDetails,
	updateUserDetails,
} = require("../services/user/userService");

const getUser = async (req, res) => {
	const userId = req.user.userId;
	try {
		const user = await getUserDetails(userId);
		res.status(200).json({ user });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

const updateUser = async (req, res) => {
	const userId = req.user.userId;
	const { username, email, firstname, lastname } = req.body;
	try {
		const { username, email, firstname, lastname, userId } = userData;
		await updateUserDetails(userData);
		res.status(200).json({ message: "User profile updated." });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

module.exports = { getUser, updateUser };
