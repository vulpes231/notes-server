const { Router } = require("express");
const { getUser, updateUser } = require("../handlers/userController");

const router = Router();

router.route("/").get(getUser).put(updateUser);

module.exports = router;
