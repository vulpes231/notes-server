const User = require("../../models/User");

async function getUserDetails(userId) {
	try {
		const user = await User.findById(userId);
		if (!user) {
			throw new Error("User not found!");
		}
		return user;
	} catch (error) {
		console.log(error);
		throw error;
	}
}

async function updateUserDetails(userData) {
	const { username, email, firstname, lastname, userId } = userData;
	try {
		const user = await User.findById(userId);
		if (!user) {
			throw new Error("User not found!");
		}
		if (username) {
			user.username = username;
		}
		if (firstname) {
			user.firstname = firstname;
		}
		if (lastname) {
			user.lastname = lastname;
		}
		if (email) {
			user.email = email;
		}
		await user.save();
		return user;
	} catch (error) {
		console.log(error);
		throw error;
	}
}

async function deleteUserDetails(userId) {
	try {
		const user = await User.findById(userId);
		if (!user) {
			throw new Error("User not found!");
		}
		await User.findByIdAndDelete(user._id);
		return true;
	} catch (error) {
		console.log(error);
		throw error;
	}
}

module.exports = { getUserDetails, updateUserDetails, deleteUserDetails };
