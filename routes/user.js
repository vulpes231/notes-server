const { Router } = require("express");
const {
	getUserDetails,
	updateUserDetails,
	deleteUserDetails,
} = require("../services/user/userService");

const router = Router();

router
	.route("/")
	.get(getUserDetails)
	.put(updateUserDetails)
	.delete(deleteUserDetails);

module.exports = router;
