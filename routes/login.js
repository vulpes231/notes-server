const { Router } = require("express");
const { loginUser } = require("../handlers/loginController");

const router = Router();

router.post("/", loginUser);

module.exports = router;
