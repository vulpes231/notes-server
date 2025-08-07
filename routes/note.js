const { Router } = require("express");
const {
	editNote,
	addNote,
	getCollabNotes,
	getUserNotes,
} = require("../handlers/noteController");

const router = Router();

router.route("/").get(getUserNotes).put(editNote).post(addNote);
router.route("/:username").get(getCollabNotes);

module.exports = router;
