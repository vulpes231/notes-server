const { default: mongoose } = require("mongoose");

const Schema = mongoose.Schema;

const noteSchema = new Schema(
	{
		title: {
			type: String,
		},
		creator: {
			type: Schema.Types.ObjectId,
			ref: "User",
		},
		content: {
			type: String,
		},
		participants: {
			type: Array,
			default: [],
			// index: true,
		},
		creatorName: {
			type: String,
		},
	},
	{ timestamps: true }
);

const Note = mongoose.model("Note", noteSchema);
module.exports = Note;
