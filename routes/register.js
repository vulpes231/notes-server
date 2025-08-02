const { Router } = require("express");
const { registerUser } = require("../handlers/registerController");

const router = Router();

router.post("/", registerUser);

module.exports = router;
