const mongoose = require("mongoose");
require("dotenv").config();

const DATABASE_URI = process.env.DATABASE_URI;

const connectDB = async () => {
	try {
		await mongoose.connect(DATABASE_URI);
		console.log("Database connected.");
	} catch (error) {
		console.log(error.message);
		throw new Error(error.message);
	}
};

module.exports = { connectDB };
