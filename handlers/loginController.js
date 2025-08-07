const { authUser } = require("../services/auth/loginService");

const loginUser = async (req, res) => {
	const { username, password } = req.body;

	if (!username || !password)
		return res.status(400).json({ message: "Username and password required!" });
	try {
		const userData = { username, password };
		const { accessToken, refreshToken } = await authUser(userData);

		res.cookie("jwt", refreshToken, {
			httpsOnly: true,
			secure: true,
			maxAge: 1000 * 60 * 60 * 7,
		});
		res.status(200).json({ accessToken });
	} catch (error) {
		res.status(500).json({ message: "Login failed. Try again" });
	}
};

module.exports = { loginUser };
