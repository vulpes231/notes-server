const {
	getNotesByUserId,
	createNote,
	updateNote,
	getCollaborations,
} = require("../services/user/noteService");

const getUserNotes = async (req, res) => {
	const userId = req.user.userId;
	if (!userId) return res.status(400).json({ message: "Malformed request!" });
	try {
		const userNotes = await getNotesByUserId(userId);
		res.status(200).json({ userNotes });
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: error.message });
	}
};

const addNote = async (req, res) => {
	const userId = req.user.userId;
	if (!userId) return res.status(400).json({ message: "Malformed request!" });

	const { title, content } = req.body;
	if (!content)
		return res.status(400).json({ message: "Add something to note!" });

	try {
		const noteData = { userId, title, content };
		await createNote(noteData);
		res.status(201).json({ message: "Note created!" });
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: error.message });
	}
};

const editNote = async (req, res) => {
	const userId = req.user.userId;
	if (!userId) return res.status(400).json({ message: "Malformed request!" });

	const { title, content, noteId } = req.body;
	if (!content)
		return res.status(400).json({ message: "Add something to note!" });

	try {
		const noteData = { userId, title, content, noteId };
		await updateNote(noteData);
		res.status(200).json({ message: "Note updated!" });
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: error.message });
	}
};

const getCollabNotes = async (req, res) => {
	const { username } = req.params;
	if (!username) return res.status(400).json({ message: "Username required!" });
	try {
		const collabs = await getCollaborations(username);
		res.status(200).json({ collabs });
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: error.message });
	}
};

module.exports = { getUserNotes, addNote, editNote, getCollabNotes };
