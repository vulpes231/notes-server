const Note = require("../../models/Note");
const User = require("../../models/User");

async function getNotesByUserId(userId) {
	try {
		const user = await User.findById(userId);
		if (!user) {
			throw new Error("Invalid ID");
		}
		const userNotes = await Note.find({ creator: user._id });
		return userNotes;
	} catch (error) {
		throw error;
	}
}

async function createNote(noteData) {
	const { userId, title, content } = noteData;
	try {
		const user = await User.findById(userId);
		if (!user) {
			throw new Error("Invalid ID");
		}

		const newNote = await Note.create({
			creator: user._id,
			title,
			content,
			creatorName: user.username,
		});
		newNote.participants.push(user.username);
		await newNote.save();
		return newNote;
	} catch (error) {
		throw error;
	}
}

async function updateNote(noteData) {
	const { noteId, userId, title, content } = noteData;
	try {
		const note = await Note.findById(noteId);
		if (!note) {
			throw new Error("Note not found!");
		}

		const user = await User.findById(userId);
		if (!user) {
			throw new Error("User not found!");
		}

		if (title) {
			note.title = title;
		}
		if (content) {
			note.content = content;
		}
		note.participants.push(user.username);
		await note.save();
		return note;
	} catch (error) {
		throw error;
	}
}

async function getCollaborations(username) {
	try {
		const user = await User.findOne({ username });
		const collabs = await Note.find({ participants: user.username });
		return collabs;
	} catch (error) {
		throw error;
	}
}

module.exports = {
	updateNote,
	createNote,
	getNotesByUserId,
	getCollaborations,
};
